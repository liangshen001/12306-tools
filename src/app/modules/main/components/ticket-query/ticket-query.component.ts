import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Station} from '../../beans/station';
import {StationGroup} from '../../beans/station-group';
import {TicketBo} from '../../../../beans/ticket-bo';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as moment from 'moment';
import {MatSort, MatTableDataSource} from '@angular/material';


export const _filter = (opt: Station[], value: string): Station[] => {
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
                private changeDetectorRef: ChangeDetectorRef,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.apiService.loadStations().subscribe(stations => {
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

            let paramsStr = localStorage.getItem('TicketQueryComponent-params');
            if (paramsStr) {
                let params = JSON.parse(paramsStr);
                let fromStationName = stations.find(station => station.code === params['leftTicketDTO.from_station']).name;
                this.fromStationInput.setValue(fromStationName);
                let toStationName = stations.find(station => station.code === params['leftTicketDTO.to_station']).name;
                this.toStationInput.setValue(toStationName);
                this.form.controls['leftTicketDTO.train_date'].setValue(moment(params['leftTicketDTO.train_date']));
                this.form.controls['leftTicketDTO.from_station'].setValue(params['leftTicketDTO.from_station']);
                this.form.controls['leftTicketDTO.to_station'].setValue(params['leftTicketDTO.to_station']);
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
        this.apiService.queryZ(params).subscribe((data) => {
            localStorage.setItem('TicketQueryComponent-params', JSON.stringify(params));
            this.dataSource.data = data;
            this.loading = false;
        });

    }

    selectStation(key: string, station: Station) {
        this.form.controls[key].setValue(station.code);
    }

    clickRow(element: TicketBo) {
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
                this.apiService.queryTicketPriceFL(params).subscribe();
                this.apiService.queryTicketPrice(params).subscribe(data => {
                    element['price'] = data;
                    element['expanded'] = true;
                });
            }
        } else {
            element['expanded'] = false;
        }
    }
}
