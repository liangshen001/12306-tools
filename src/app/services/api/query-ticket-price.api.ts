import {Api, HttpGetApi} from './api';
import {Injectable} from '@angular/core';
import {QueryTicketPriceParams} from '../../beans/query-ticket-price.params';
import {QueryTicketPriceResult} from '../../beans/query-ticket-price.result';

@Injectable()
export class QueryTicketPriceApi extends HttpGetApi<QueryTicketPriceParams, QueryTicketPriceResult> {
    constructor() {
        super('https://kyfw.12306.cn/otn/leftTicket/queryTicketPrice');
    }
    convertResult(result: QueryTicketPriceResult): QueryTicketPriceResult {
        return result;
    }

    convertParams(params: QueryTicketPriceParams) {
        return {
            train_no: params.trainNo,
            from_station_no: params.fromStationNo,
            to_station_no: params.toStationNo,
            seat_types: params.seatTypes,
            train_date: params.trainDate
        };
    }

}
