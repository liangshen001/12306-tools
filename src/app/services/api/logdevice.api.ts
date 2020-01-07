import {HttpGetApi} from './api';
import {BaseResponse} from '../../models/base-response';

export class LogdeviceApi extends HttpGetApi<any, any> {
    convertParams(params: any): any {
        return params;
    }

    convertResult(result?: BaseResponse): any {
        return result;
    }

}
