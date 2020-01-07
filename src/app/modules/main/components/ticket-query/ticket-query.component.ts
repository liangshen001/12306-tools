import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {StationResult} from '../../../../models/station.result';
import {StationGroup} from '../../models/station-group';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as moment from 'moment';
import {MatSort, MatTableDataSource} from '@angular/material';
import {QueryZApi} from '../../../../services/api/query-z.api';
import {QueryTicketPriceApi} from '../../../../services/api/query-ticket-price.api';
import {QueryTicketPriceFLApi} from '../../../../services/api/query-ticket-price-f-l.api';
import {QueryStationNameApi} from '../../../../services/api/query-station-name.api';
import {CaptchaImage64Api} from '../../../../services/api/captcha-image64.api';
import {TicketZResult} from '../../../../models/ticket-z.result';
import {NgxElectronService} from '@ngx-electron/core';
import {LeftTicketInitApi} from '../../../../services/api/left-ticket-init.api';
import {CookieService} from 'ngx-cookie';


export const _filter = (opt: StationResult[], value: string): StationResult[] => {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.name.toLowerCase().includes(filterValue) ||
        item.simpleSpell.toLowerCase().includes(filterValue) || item.spell.toLowerCase().includes(filterValue));
};

@Component({
    selector: 'app-ticket-query',
    templateUrl: './ticket-query.component.html',
    styleUrls: ['./ticket-query.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TicketQueryComponent implements OnInit {
    form: FormGroup = this._formBuilder.group({
        'leftTicketDTO.from_station': ['', Validators.required],
        'leftTicketDTO.to_station': ['', Validators.required],
        'leftTicketDTO.train_date': ['', Validators.required]
    });

    fromStationInput: FormControl = this._formBuilder.control('');
    toStationInput: FormControl = this._formBuilder.control('');

    fromStationGroupOptions: Observable<StationGroup[]>;
    toStationGroupOptions: Observable<StationGroup[]>;

    displayedColumns = ['train', 'fromAndToStationName', 'fromAndToStationTime', 'take', 'businessClass', 'firstClass', 'secondClass', 'advancedSoftSleeper', 'softSleeper', 'moveSleeper', 'hardSleeper', 'softClass', 'hardClass', 'noSeat', 'others', 'remarks'];

    dataSource = new MatTableDataSource();
    @ViewChild(MatSort, {static: false})
    sort: MatSort;

    loading: boolean;

    constructor(private apiService: ApiService,
                private ngxElectronService: NgxElectronService,
                private changeDetectorRef: ChangeDetectorRef,
                private queryZApi: QueryZApi,
                private queryTicketPriceApi: QueryTicketPriceApi,
                private queryTicketPriceFLApi: QueryTicketPriceFLApi,
                private queryStationNameApi: QueryStationNameApi,
                private captchaImage64Api: CaptchaImage64Api,
                private leftTicketInitApi: LeftTicketInitApi,
                private cookieService: CookieService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        // this.apiService.request({
        //     api: this.leftTicketInitApi
        // }).subscribe();
        // let win = this.ngxElectronService.createWindow('verification-code', 'verification-code', {
        //     width: 300,
        //     height: 200,
        //     title: '验证码'
        // });
        this.dataSource.sort = this.sort;
        this.apiService.request({
            api: this.queryStationNameApi
        }).subscribe(stations => {
            let group = stations.reduce((previousValue, currentValue) => {
                let groupLabel = currentValue.spell.substr(0, 1);
                if (!previousValue[groupLabel]) {
                    previousValue[groupLabel] = {
                        label: groupLabel,
                        stations: []
                    };
                }
                previousValue[groupLabel].stations.push(currentValue);
                return previousValue;
            }, {});
            let stationGroups = Object.keys(group).map(key => group[key]);

            this.fromStationGroupOptions = this.fromStationInput.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterGroup(stationGroups, value))
                );
            this.toStationGroupOptions = this.toStationInput.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterGroup(stationGroups, value))
                );

            if (this.cookieService.get('_jc_save_fromDate')) {
                let fromDate = this.cookieService.get('_jc_save_fromDate');
                let toDate = this.cookieService.get('_jc_save_toDate');
                let fromStation = this.cookieService.get('_jc_save_fromStation');
                let toStation = this.cookieService.get('_jc_save_toStation');
                let fromStationArr = unescape(fromStation).split(',');
                let toStationArr = unescape(toStation).split(',');
                this.form.controls['leftTicketDTO.train_date'].patchValue(moment(fromDate));
                this.form.controls['leftTicketDTO.from_station'].patchValue(fromStationArr[1]);
                this.form.controls['leftTicketDTO.to_station'].patchValue(toStationArr[1]);
                this.fromStationInput.patchValue(fromStationArr[0]);
                this.toStationInput.patchValue(toStationArr[0]);
                setTimeout(() => this.changeDetectorRef.detectChanges());
            }
        });
    }

    private _filterGroup(stationGroups: StationGroup[], value: string): StationGroup[] {
        if (value) {
            return stationGroups.map(group => ({label: group.label, stations: _filter(group.stations, value)}))
                .filter(group => group.stations.length > 0);
        }
        return stationGroups;
    }

    search() {
        if (!this.form.valid) {
            return;
        }
        this.loading = true;
        let params = {
            'leftTicketDTO.train_date': this.form.getRawValue()['leftTicketDTO.train_date'].format('YYYY-MM-DD'),
            'leftTicketDTO.from_station': this.form.getRawValue()['leftTicketDTO.from_station'],
            'leftTicketDTO.to_station': this.form.getRawValue()['leftTicketDTO.to_station'],
            'purpose_codes': 'ADULT'
        };

        this.apiService.request({
            api: this.queryZApi,
            params
        }).subscribe((data) => {
            this.dataSource.data = data;
            this.loading = false;
        });

    }

    selectStation(key: string, station: StationResult) {
        this.form.controls[key].setValue(station.code);
    }

    clickRow(element: TicketZResult) {
        if (!element['expanded']) {
            if (element['price']) {
                element['expanded'] = true;
            } else {
                const params = {
                    trainDate: element.trainDate,
                    trainNo: element.trainNo,
                    fromStationNo: element.fromStationNo,
                    toStationNo: element.toStationNo,
                    seatTypes: element.seatTypes
                };
                this.apiService.request({
                    api: this.queryTicketPriceFLApi,
                    params
                }).subscribe();
                this.apiService.request({
                    api: this.queryTicketPriceApi,
                    params
                }).subscribe(data => {
                    element['price'] = data;
                    element['expanded'] = true;
                });
            }
        } else {
            element['expanded'] = false;
        }
    }
}
