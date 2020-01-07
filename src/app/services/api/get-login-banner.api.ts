import {HttpGetApi} from './api';
import {BaseResponse} from '../../models/base-response';

/**
 * 接口用于获取sessionid 写到cookie
 * 没有其它实际功能
 */
export class GetLoginBannerApi extends HttpGetApi<void, void> {
    constructor() {
        super('https://kyfw.12306.cn/otn/index12306/getLoginBanner');
    }
    convertParams(params: any): void {
    }
    // 结果无用
    convertResult(result?: BaseResponse): void {
    }
}
