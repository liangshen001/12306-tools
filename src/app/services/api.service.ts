import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScriptService} from './script.service';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NgxElectronService} from '@ngx-electron/core';
import {BaseResponse} from '../models/base-response';
import {MatSnackBar} from '@angular/material';
import {Api} from './api/api';



@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient,
                private ngxElectronService: NgxElectronService,
                private snackBar: MatSnackBar,
                private scriptService: ScriptService) {
    }

    request<P, B, R>(option: {
        api: Api<P, B, R>;
        params?: P;
        body?: B;
    }): Observable<R> {
        let params = option.api.convertParams(option.params);
        let observable: Observable<any>;
        if (option.api.type === 'get' || option.api.type === 'post') {
            let options = {
                ...params ? {
                    params: params
                } : {},
                responseType: option.api['responseType'],
                withCredentials: true
            };
            if (option.api.type === 'get') {
                observable = this.httpClient.get<BaseResponse<R>>(option.api.url, options);
            } else if (option.api.type === 'post') {
                let body = option.api.convertBody(option.body);
                observable = this.httpClient.post<BaseResponse<R>>(option.api.url,
                    body ? body : {}, options);
            }
        } else {
            let url = option.api.url;
            if (option.api.type === 'script') {
                if (params) {
                    if (!url.includes('?')) {
                        url += '?';
                    } else {
                        if (!url.endsWith('&')) {
                            url += '&';
                        }
                    }
                    Object.keys(params).forEach(key => {
                        url += key + '=' + params[key] + '&';
                    });
                    url = url.slice(0, -1);
                }
                observable = this.scriptService.loadScript(url);
            } else if (option.api.type === 'jsonp') {
                this.httpClient.request('JSONP', url, {
                    params: params ? params : {}
                });
                observable = this.httpClient.jsonp<R>(url, 'callback');
            }
        }

        return observable.pipe(
            tap(() => {
            }, res => {
                this.snackBar.open(res.message, '关闭', {
                    duration: 2000,
                });
            }),
            filter(res => option.api.filterResult(res)),
            map(res => option.api.convertResult(res)),
        );
    }

}
