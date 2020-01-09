import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {StationResult} from '../../../../models/station.result';
import {StationGroup} from '../../models/station-group';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as moment from 'moment';
import {MatSort, MatTableDataSource} from '@angular/material';
import {QueryZApi} from '../../../../services/api/query-z.api';
import {QueryTicketPriceApi} from '../../../../services/api/query-ticket-price.api';
import {QueryTicketPriceFLApi} from '../../../../services/api/query-ticket-price-f-l.api';
import {QueryStationApi} from '../../../../services/api/query-station.api';
import {CaptchaImage64Api} from '../../../../services/api/captcha-image64.api';
import {TicketZResult} from '../../../../models/ticket-z.result';
import {NgxElectronService} from '@ngx-electron/core';
import {LeftTicketInitApi} from '../../../../services/api/left-ticket-init.api';
import {LogdeviceApi} from '../../../../services/api/logdevice.api';
import {GetLoginBannerApi} from '../../../../services/api/get-login-banner.api';
import {LoginConfApi} from '../../../../services/api/login-conf.api';


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

    displayedColumns = ['train', 'fromAndToStationName', 'fromAndToStationTime', 'take', 'businessClass', 'firstClass', 'secondClass',
        'advancedSoftSleeper', 'softSleeper', 'moveSleeper', 'hardSleeper', 'softClass', 'hardClass', 'noSeat', 'others', 'remarks'];

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
                private queryStationNameApi: QueryStationApi,
                private getLoginBannerApi: GetLoginBannerApi,
                private leftTicketInitApi: LeftTicketInitApi,
                private logdeviceApi: LogdeviceApi,
                private loginConfApi: LoginConfApi,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.apiService.request({
            api: this.loginConfApi
        }).subscribe(data => {
            console.log(data);
            // this.apiService.request({
            //     api: this.logdeviceApi
            // }).subscribe();
        });
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
            let cookies = this.ngxElectronService.remote.session.defaultSession.cookies;
            // cookies.get(
            //     {url: 'https://kyfw.12306.cn'}
            // ).then(items => {
            //     debugger;
            //     console.log(items);
            //     // 删除cookie需要循环remove
            //     for (let i = 0; i < items.length; i++) {
            //         // 删除cookie
            //         cookies.remove(
            //             'https://kyfw.12306.cn/index/otn/login/conf',
            //             items[i].name
            //         );
            //     }
            // });
            cookies.get({
                domain: '12306.cn'
            }).then(items => {
                debugger;
                if (!items.some(item => item.name === '_jc_save_fromDate')) {
                    return;
                }
                let fromDate = items.find(item => item.name === '_jc_save_fromDate').value;
                let toDate = items.find(item => item.name === '_jc_save_toDate').value;
                let fromStation = unescape(items.find(item => item.name === '_jc_save_fromStation').value);
                let toStation = unescape(items.find(item => item.name === '_jc_save_toStation').value);
                let fromStationArr = fromStation.split(',');
                let toStationArr = toStation.split(',');
                this.form.controls['leftTicketDTO.train_date'].patchValue(moment(fromDate));
                this.form.controls['leftTicketDTO.from_station'].patchValue(fromStationArr[1]);
                this.form.controls['leftTicketDTO.to_station'].patchValue(toStationArr[1]);
                this.fromStationInput.patchValue(fromStationArr[0]);
                this.toStationInput.patchValue(toStationArr[0]);
                setTimeout(() => this.changeDetectorRef.detectChanges());
            });
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

        // let cookies = this.ngxElectronService.remote.session.defaultSession.cookies;
        // cookies.set({
        //     url: 'https://kyfw.12306.cn',
        //     domain: 'kyfw.12306.cn',
        //     name: '_jc_save_fromDate',
        //     value: params['leftTicketDTO.train_date']
        // });
        // cookies.set({
        //     url: 'https://kyfw.12306.cn',
        //     domain: 'kyfw.12306.cn',
        //     name: '_jc_save_toDate',
        //     value: params['leftTicketDTO.train_date']
        // });
        // cookies.set({
        //     url: 'https://kyfw.12306.cn',
        //     domain: 'kyfw.12306.cn',
        //     name: '_jc_save_fromStation',
        //     value: this.fromStationInput.value + ',' + params['leftTicketDTO.from_station']
        // });
        // cookies.set({
        //     url: 'https://kyfw.12306.cn',
        //     domain: 'kyfw.12306.cn',
        //     name: '_jc_save_toStation',
        //     value: this.toStationInput.value + ',' + params['leftTicketDTO.to_station']
        // });

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
                }).subscribe(() => {
                    this.apiService.request({
                        api: this.queryTicketPriceApi,
                        params
                    }).subscribe(data => {
                        element['price'] = data;
                        element['expanded'] = true;
                    });
                });
            }
        } else {
            element['expanded'] = false;
        }
    }
}
