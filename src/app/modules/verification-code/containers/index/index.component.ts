import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {CaptchaImage64Api} from '../../../../services/api/captcha-image64.api';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    base64: string;

    constructor(private apiService: ApiService,
                private captchaImage64Api: CaptchaImage64Api) {
    }

    ngOnInit() {

        this.apiService.request({
            api: this.captchaImage64Api
        }).subscribe(data => {
            this.base64 = 'data:image/jpg;base64,' + data.image;
        });
    }

}
