import {HttpGetApi} from './api';
import {Injectable} from '@angular/core';
import {QueryTicketPriceApi} from './query-ticket-price.api';

/**
 * 查询车票价格（网站是和QueryTicketPriceApi 俩个接口一起调用   目前做用未知）
 */
@Injectable()
export class QueryTicketPriceFLApi extends HttpGetApi<any, void> {

    constructor(private queryTicketPriceApi: QueryTicketPriceApi) {
        super('https://kyfw.12306.cn/otn/leftTicket/queryTicketPriceFL', 'text');
    }

    convertParams(params: any): any {
        return this.queryTicketPriceApi.convertParams(params);
    }
    // 此接口会返回null 不作转换 接口作用不明
    convertResult(): void {
    }

    filterResult() {
        return true;
    }

}
