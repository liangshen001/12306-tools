import {Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginConfApi} from './services/api/login-conf.api';
import {ApiService} from './services/api.service';
import {GetLoginBannerApi} from './services/api/get-login-banner.api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular';
    constructor(private getLoginBannerApi: GetLoginBannerApi,
                private apiService: ApiService) {
        // 接口会设置cookie信息
        apiService.request({
            api: getLoginBannerApi
        }).subscribe();
    }

}
