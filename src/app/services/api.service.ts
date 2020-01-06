import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScriptService} from './script.service';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NgxElectronService} from '@ngx-electron/core';
import {BaseResponse} from '../models/base-response';
import {MatSnackBar} from '@angular/material';
import {Api} from './api/api';
import {QueryZApi} from './api/query-z.api';
import {QueryTicketPriceApi} from './api/query-ticket-price.api';
import {QueryStationNameApi} from './api/query-station-name.api';
import {QueryTicketPriceFLApi} from './api/query-ticket-price-f-l.api';



@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient,
                private ngxElectronService: NgxElectronService,
                private snackBar: MatSnackBar,
                private leftTicketQueryZApi: QueryZApi,
                private leftTicketQueryTicketPriceApi: QueryTicketPriceApi,
                private queryStationNameApi: QueryStationNameApi,
                private queryTicketPriceFLApi: QueryTicketPriceFLApi,
                private scriptService: ScriptService) {
    }

    request<P, B, R>(option: {
        api: Api<P, B, R>;
        params?: P;
        body?: B;
    }): Observable<R> {
        if (option.api.type === 'get' || option.api.type === 'post') {
            let observable: Observable<BaseResponse<R>>;

            if (option.api.type === 'get') {
                observable = this.httpClient.get<BaseResponse<R>>(option.api.url, {
                    ...option.params ? {
                        params: option.api.convertParams(option.params)
                    } : {},
                    withCredentials: true
                });
            } else if (option.api.type === 'post') {
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
        } else {
            let url = option.api.url;
            let params = option.api.convertParams(option.params);
            if (params) {
                if (!url.includes('?')) {
                    url += '?';
                } else {
                    if (!url.endsWith('&')) {
                        url += '&';
                    }
                }
                Object.keys(params).forEach(key => url += key + '=' + params[key] + '&');
            }
            if (option.api.type === 'script') {
                return this.scriptService.loadScript(url)
                    .pipe(
                        map(() => option.api.convertResult()),
                        tap(() => {}, () => {
                            this.snackBar.open('调用接口失败api: ' + JSON.stringify(option.api), '关闭', {
                                duration: 2000,
                            });
                        })
                    );
            } else if (option.api.type === 'jsonp') {
                return this.httpClient.jsonp<R>(url, params['callback']);
            }
        }
    }

}
