import {Api, ScriptApi} from './api';
import {Station} from '../../modules/main/beans/station';

declare const station_names: string;
export class QueryStationNameApi extends ScriptApi<void, Station[]> {
    constructor() {
        super('https://kyfw.12306.cn/otn/resources/js/framework/station_name.js');
    }

    convertParams(params: void): any {
        return {
            station_version: '1.9139'
        };
    }

    convertResult(): Station[] {
        let stationStrs = station_names.split('@');
        return stationStrs.filter(item => !!item)
            .map(item => {
                let stationInfo = item.split('|');
                return {
                    name: stationInfo[1],
                    code: stationInfo[2],
                    spell: stationInfo[3],
                    simpleSpell: stationInfo[0]
                };
            });
    }

}
