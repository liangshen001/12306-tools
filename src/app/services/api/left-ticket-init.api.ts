import {HttpGetApi, HttpPostApi} from './api';
import {Injectable} from '@angular/core';
import {LoginConfResult} from '../../models/login-conf.result';
import {LeftTicketInitParams} from '../../models/left-ticket-init.params';

/**
 * 查看登录配置
 */
@Injectable()
export class LeftTicketInitApi extends HttpGetApi<LeftTicketInitParams, void> {
    constructor() {
        super('https://kyfw.12306.cn/otn/leftTicket/init', 'text');
    }
    convertResult(result: any): void {
    }
    convertParams(params: LeftTicketInitParams): any {
        return {
            linktypeid: 'dc',
            flag: 'N,N,Y',
            ...params
        };
    }

    filterResult(): boolean {
        return true;
    }

}
