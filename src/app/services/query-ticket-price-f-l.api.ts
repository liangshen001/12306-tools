import {HttpGetApi} from '../beans/api';
import {Injectable} from '@angular/core';
import {LeftTicketQueryTicketPriceApi} from './left-ticket-query-ticket-price.api';

@Injectable()
export class QueryTicketPriceFLApi extends HttpGetApi<any, any> {

    constructor(private queryTicketPriceApi: LeftTicketQueryTicketPriceApi) {
        super();
    }

    url = '//kyfw.12306.cn/otn/leftTicket/queryTicketPriceFL';

    convertParams(params: any): any {
        return this.queryTicketPriceApi.convertParams(params);
    }

    convertResult(result?: any): any {
        return null;
    }

}
