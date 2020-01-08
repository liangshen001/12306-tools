import {Api, ScriptApi} from './api';
import {StationResult} from '../../models/station.result';
import {Injectable} from '@angular/core';
import {QueryStationApi} from './query-station.api';

declare const favorite_names: string;

/**
 * 获取常用车站列表
 */
@Injectable()
export class QueryFavoriteStationApi extends ScriptApi<void, StationResult[]> {
    constructor() {
        super('https://kyfw.12306.cn/otn/resources/js/framework/favorite_name.js');
    }

    convertParams(): any {
    }

    convertResult(): StationResult[] {
        let stationStrs = favorite_names.split('@');
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
