import {JSONPApi} from './api';

/**
 * 12306图片验证码接口
 */
export class CaptchaImage64Api extends JSONPApi<void, any> {

    constructor() {
        super('https://kyfw.12306.cn/passport/captcha/captcha-image64');
    }

    convertResult(result?: void) {
        return result;
    }

    convertParams(params: void): { callback: string } | any {
        return {
            'login_site': 'E',
            'module': 'login',
            'rand': 'sjrand',
            callback: 'jQuery19106672487849504936_1578282339387',
            '_': '1578282339388'
        };
    }
}
