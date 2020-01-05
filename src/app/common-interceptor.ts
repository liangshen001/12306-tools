import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 先补全请求协议
        // let url = req.url;
        // const needToken = ignoreToken.filter(u => url.match(u));
        // if (url.indexOf('http://') < 0 || url.indexOf('https://') < 0) {
        //     url = 'http://' + url;
        // }
        // // 过滤掉不需要token的请求
        // if (!needToken.length) {
        //     req = req.clone({
        //         url
        //     });
        // } else {
        //     req = req.clone({
        //         url,
        //         headers: req.headers.set('token', 'asdqwe')
        //     });
        // }
        document.cookie = 'JSESSIONID=0DEA7DFDB5BC4188E581949740E67D66;';
        document.cookie = '_jc_save_fromDate=2019-12-28;';
        document.cookie = '_jc_save_fromStation=%u5317%u4EAC%2CBJP;';
        document.cookie = '_jc_save_toDate=2019-12-28;';
        document.cookie = '_jc_save_toStation=%u94C1%u5CAD%2CTLT;';
        document.cookie = '_jc_save_wfdc_flag=dc;';
        document.cookie = 'route=c5c62a339e7744272a54643b3be5bf64;';
        document.cookie = 'BIGipServerpassport=803733770.50215.0000;';
        document.cookie = 'RAIL_DEVICEID=nh3SpgP1da6u1a9urn6_7tADXVaTsPEF2uld54HLIEErXlpABT8j5xwXs-tvZH_T4oGEOig1SNmkRBA7i8fFjhjOMNdtIopYGRLkf_lrN9F04Nc8PK76wEjVZS2ckjyKnxs2PGqRTPF8-iajCa2FEkY7TS3ornb1;';
        document.cookie = 'RAIL_EXPIRATION=1577801748052;';
        document.cookie = 'BIGipServerotn=2280128778.24610.0000;';
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req).pipe(
            tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log(event);
                        if (event.status >= 500) {
                            // 跳转错误页面
                        }
                    }
                },
                error => {
                    // token过期 服务器错误等处理
                })
        );
    }
}
