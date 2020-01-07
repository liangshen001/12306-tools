import {HttpGetApi, HttpPostApi} from './api';
import {Injectable} from '@angular/core';
import {LoginConfResult} from '../../models/login-conf.result';

/**
 * 查看登录配置
 */
@Injectable()
export class LeftTicketInitApi extends HttpGetApi<void, void> {
    constructor() {
        super('https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=福州,FZS&ts=北京,BJP&date=2020-01-07&flag=N,N,Y', 'text');
    }
    convertResult(result: any): void {
    }
    convertParams(params: any): any {
    }

    filterResult(): boolean {
        return true;
    }

}
