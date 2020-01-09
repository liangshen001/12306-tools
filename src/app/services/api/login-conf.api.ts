import {HttpGetApi, HttpPostApi} from './api';
import {Injectable} from '@angular/core';
import {LoginConfResult} from '../../models/login-conf.result';
import {BaseResponse} from '../../models/base-response';
import {NgxElectronService} from '@ngx-electron/core';

/**
 * 查看登录配置
 */
@Injectable()
export class LoginConfApi extends HttpPostApi<void, void, any> {
    constructor(private ngxElectronService: NgxElectronService) {
        super('https://kyfw.12306.cn/index/otn/login/conf');
    }
    convertResult(res: BaseResponse<{
        is_login: 'N' | 'Y';
        is_login_passCode: 'N' | 'Y';
        is_sweep_login: 'N' | 'Y';
        is_uam_login: 'N' | 'Y';
        isstudentDate: boolean;
        psr_qr_code_result: 'N' | 'Y';
        login_url: string;
        other_control: number;
        studentDate: string[];
    }>): LoginConfResult {
        let cookies = this.ngxElectronService.remote.session.defaultSession.cookies;
        cookies.get({
            domain: '12306.cn'
        }).then(items => {
            debugger;
        });
        let result = res.data;
        return {
            isLogin: result.is_login === 'Y',
            isLoginPassCode: result.is_login_passCode === 'Y',
            isSweepLogin: result.is_sweep_login === 'Y',
            isUamLogin: result.is_uam_login === 'Y',
            isstudentDate: result.isstudentDate,
            psrQrCodeResult: result.psr_qr_code_result === 'Y',
            loginUrl: result.login_url,
            otherControl: result.other_control,
            studentDate: result.studentDate,
        };
    }
    // 接口参数
    convertParams(): void {

        let cookies = this.ngxElectronService.remote.session.defaultSession.cookies;
        cookies.get({
            domain: '12306.cn'
        }).then(items => {
            debugger;
        });
    }

    convertBody(body: void): any {
    }
}
