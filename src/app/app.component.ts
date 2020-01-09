import {Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginConfApi} from './services/api/login-conf.api';
import {ApiService} from './services/api.service';
import {GetLoginBannerApi} from './services/api/get-login-banner.api';
import {NgxElectronService} from '@ngx-electron/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular';
    constructor(private getLoginBannerApi: GetLoginBannerApi,
                private ngxElectronService: NgxElectronService,
                private apiService: ApiService) {
        // 接口会设置cookie信息
        // apiService.request({
        //     api: getLoginBannerApi
        // }).subscribe();
        // _jc_save_wfdc_flag

        // let cookies = this.ngxElectronService.remote.session.defaultSession.cookies;
        // cookies.set({
        //     url: 'https://kyfw.12306.cn',
        //     domain: 'kyfw.12306.cn',
        //     name: '_jc_save_wfdc_flag',
        //     value: 'dc'
        // });
    }

}
