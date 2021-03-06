import {Api, ScriptApi} from './api';
import {StationResult} from '../../models/station.result';

declare const station_names: string;

/**
 * 获取车站列表
 */
export class QueryStationApi extends ScriptApi<void, StationResult[]> {
    constructor() {
        super('https://kyfw.12306.cn/otn/resources/js/framework/station_name.js');
    }

    convertParams(): any {
        return {
            station_version: '1.9139'
        };
    }

    convertResult(): StationResult[] {
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
