import {JSONPApi} from './api';
import {CaptchaImage64Result} from '../../models/captcha-image-64.result';

/**
 * 12306图片验证码接口
 */
export class CaptchaImage64Api extends JSONPApi<void, CaptchaImage64Result> {

    constructor() {
        super('https://kyfw.12306.cn/passport/captcha/captcha-image64');
    }

    convertParams(): any {
        return {
            'login_site': 'E',
            'module': 'login',
            'rand': 'sjrand',
            '_': '1578282339388'
        };
    }
    convertResult(result: CaptchaImage64Result): CaptchaImage64Result {
        return result;
    }
}
