import {HttpGetApi} from './api';
import {Injectable} from '@angular/core';
import {QueryTicketPriceApi} from './query-ticket-price.api';

@Injectable()
export class QueryTicketPriceFLApi extends HttpGetApi<any, any> {

    constructor(private queryTicketPriceApi: QueryTicketPriceApi) {
        super('https://kyfw.12306.cn/otn/leftTicket/queryTicketPriceFL');
    }

    convertParams(params: any): any {
        return this.queryTicketPriceApi.convertParams(params);
    }

    convertResult(result?: any): any {
        return null;
    }

}
