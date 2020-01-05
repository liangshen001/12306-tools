import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScriptService} from './script.service';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Station} from '../modules/main/beans/station';
import {NgxElectronService} from '@ngx-electron/core';
import {BaseResponse} from '../beans/base-response';
import {MatSnackBar} from '@angular/material';
import {Api} from '../beans/api';
import {LeftTicketQueryZApi} from './left-ticket-query-z.api';
import {LeftTicketQueryTicketPriceApi} from './left-ticket-query-ticket-price.api';
import {QueryStationNameApi} from './query-station-name.api';
import {QueryTicketPriceParams} from '../beans/query-ticket-price.params';
import {QueryTicketPriceFLApi} from './query-ticket-price-f-l.api';



@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient,
                private ngxElectronService: NgxElectronService,
                private snackBar: MatSnackBar,
                private leftTicketQueryZApi: LeftTicketQueryZApi,
                private leftTicketQueryTicketPriceApi: LeftTicketQueryTicketPriceApi,
                private queryStationNameApi: QueryStationNameApi,
                private queryTicketPriceFLApi: QueryTicketPriceFLApi,
                private scriptService: ScriptService) {
    }

    queryZ(params: {
        'leftTicketDTO.train_date': string;
        'leftTicketDTO.from_station': string;
        'leftTicketDTO.to_station': string;
        'purpose_codes': string;
    }) {
        return this.request({
            api: this.leftTicketQueryZApi,
            params
        });
    }

    queryTicketPrice(params: QueryTicketPriceParams) {
        return this.request({
            api: this.leftTicketQueryTicketPriceApi,
            params
        });
    }

    loadStations() {
        return this.request({
            api: this.queryStationNameApi
        });
    }

    queryTicketPriceFL(params: QueryTicketPriceParams) {
        return this.request({
            api: this.queryTicketPriceFLApi,
            params
        });
    }

    private request<P, B, R>(option: {
        api: Api<P, B, R>;
        params?: P;
        body?: B;
    }): Observable<R> {
        if (option.api.type === 'script') {
            return this.scriptService.loadScript(option.api.url)
                .pipe(
                    map(() => option.api.convertResult()),
                    tap(() => {}, () => {
                        this.snackBar.open('调用接口失败api: ' + JSON.stringify(option.api), '关闭', {
                            duration: 2000,
                        });
                    })
                );
        } else {
            let observable: Observable<BaseResponse<R>>;

            if (option.api.method === 'get') {
                observable = this.httpClient.get<BaseResponse<R>>(option.api.url, {
                    ...option.params ? {
                        params: option.api.convertParams(option.params)
                    } : {},
                    withCredentials: true
                });
            } else {
                observable = this.httpClient.post<BaseResponse<R>>(option.api.url,
                    option.body ? option.api.convertBody(option.body) : {}, {
                        ...option.params ? {
                            params: option.api.convertParams(option.params)
                        } : {},
                        withCredentials: true
                    });
            }
            return observable.pipe(
                tap(() => {
                }, res => {
                    this.snackBar.open(res.message, '关闭', {
                        duration: 2000,
                    });
                }),
                filter(res => {
                    if (!res || res.status) {
                        return true;
                    }
                    this.snackBar.open(res.messages, '关闭', {
                        duration: 2000,
                    });
                    return false;
                }),
                map(res => option.api.convertResult(res && res.data)),
            );
        }
    }

}
