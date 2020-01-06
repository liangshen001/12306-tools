import {Api, HttpGetApi} from '../beans/api';
import {TicketBo} from '../beans/ticket-bo';
import {Injectable} from '@angular/core';


/**
 * 查询车票接口定义
 */
@Injectable()
export class LeftTicketQueryZApi extends HttpGetApi<any, TicketBo[]> {
    url = 'https://kyfw.12306.cn/otn/leftTicket/queryZ';
    convertParams(params: any): {
        'leftTicketDTO.train_date': string;
        'leftTicketDTO.from_station': string;
        'leftTicketDTO.to_station': string;
        'purpose_codes': string;
    } {
        return params;
    }
    convertResult(data: {
        flag: string;
        map: any;
        result: string[];
    }): TicketBo[] {
        return data.result.map(item => {
            let arr = item.split('|');
            let trainDate = arr[13].substr(0, 4) + '-' + arr[13].substr(4, 2) + '-' + arr[13].substr(6);
            return {
                train: arr[3],
                fromStationName: data.map[arr[6]],
                fromStation: arr[6],
                toStationName: data.map[arr[7]],
                toStation: arr[7],
                fromStationTime: arr[8],
                toStationTime: arr[9],
                take: arr[10],
                businessClass: arr[25], // ok
                firstClass: arr[31], // ok!!!
                secondClass: arr[30], // ok!!!!!!!!!
                advancedSoftSleeper: '',
                softSleeper: arr[23], // ok
                moveSleeper: arr[33], // ok
                hardSleeper: arr[28], // ok!!!!!!
                softClass: '',
                hardClass: arr[29], // ok!!!!!!!!
                noSeat: arr[26], // ok
                others: '',
                remarks: arr[1],
                trainNo: arr[2],
                fromStationNo: arr[16],
                toStationNo: arr[17],
                seatTypes: arr[35],
                trainDate
            };
        });
    }
}


