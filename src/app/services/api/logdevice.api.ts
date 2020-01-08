import {HttpGetApi, JSONPApi, ScriptApi} from './api';
import {BaseResponse} from '../../models/base-response';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import moment = require('moment');
import {NgxElectronService} from '@ngx-electron/core';
import {session} from 'electron';

let cookieService: CookieService;
let ngxElectronService: NgxElectronService;

// 接收logdevice返回数据
window['callbackFunction'] = function(value) {
    let json: any = JSON.parse(value);
    // TODO 问题：这里没有设置上cookie
    let cookies = ngxElectronService.remote.session.defaultSession.cookies;
    cookies.set({
        url: 'https://kyfw.12306.cn',
        domain: 'kyfw.12306.cn',
        name: 'RAIL_DEVICEID',
        value: json.dfp
    });
    cookies.set({
        url: 'https://kyfw.12306.cn',
        domain: 'kyfw.12306.cn',
        name: 'RAIL_EXPIRATION',
        value: json.exp
    });
// , {
//         path: '/',
//             domain: '.12306.cn',
//             expires: moment().add('5', 'days').toDate()
//     }
    debugger;
};

@Injectable()
export class LogdeviceApi extends ScriptApi<any, any> {

    constructor(private _cookieService: CookieService,
                private _ngxElectronService: NgxElectronService) {
        super('https://kyfw.12306.cn/otn/HttpZF/logdevice?algID=se3zuyBjQ9&hashCode=IDo2OcePTa2o-K_3Q9xfjUrorEM4J_Ifu87LRCxVwC8&FMQw=0' +
            '&q4f3=zh-CN&VySQ=FGHZk66d0Df5gEKGlRHFaD4KuKoKXx1m&VPIf=1&custID=133&VEek=unknown&dzuS=0&yD16=1&EOQP=c227b88b01f5c513710d4b9' +
            'f16a5ce52&jp76=8496cc0b1f00444d539d1f53e6c5d4af&hAqN=MacIntel&platform=WEB&ks0Q=0a2b31f0aef6484fb18caefa0fb1fabb&TeRS=986x' +
            '1920&tOHY=24xx1080x1920&Fvje=i1l1s1&q5aJ=-8&wNLf=99115dfb07133750ba677d055874de87&0aew=Mozilla/5.0%20(Macintosh;%20Intel%2' +
            '0Mac%20OS%20X%2010_15_1)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.3%20Safari/605.1.15&E3gR=b5b36118' +
            '80ee4f419a59d57d17502285&timestamp=1578408745232');
        cookieService = _cookieService;
        ngxElectronService = _ngxElectronService;
    }

    convertParams(params: any): any {
        return params;
    }

    convertResult(result?: BaseResponse): any {
        return result;
    }

}
