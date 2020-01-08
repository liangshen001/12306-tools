import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {CaptchaImage64Api} from '../../../../services/api/captcha-image64.api';
import {NgxElectronService} from '@ngx-electron/core';
import {CodeComponent} from '../../components/code/code.component';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    @ViewChild(CodeComponent, {static: false})
    code: CodeComponent;

    constructor(private apiService: ApiService,
                private ngxElectronService: NgxElectronService,
                private snackBar: MatSnackBar,
                private captchaImage64Api: CaptchaImage64Api) {
    }

    ngOnInit() {
    }

    send() {
        this.ngxElectronService.send(this.code.points, 'main');
        this.ngxElectronService.remote.getCurrentWindow().close();
    }
}
