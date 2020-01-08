import {Component, HostListener, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {NgxElectronService, Point} from '@ngx-electron/core';
import {CaptchaImage64Api} from '../../../../services/api/captcha-image64.api';
import {ControlValueAccessor} from '@angular/forms';
import {noop} from 'rxjs';

@Component({
    selector: 'app-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

    base64: string;

    points: Point[] = [];

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;


    constructor(private apiService: ApiService,
                private ngxElectronService: NgxElectronService,
                private captchaImage64Api: CaptchaImage64Api) {
    }

    ngOnInit() {
        this.refreshCode();
    }

    refreshCode() {
        this.apiService.request({
            api: this.captchaImage64Api
        }).subscribe(data => {
            this.base64 = 'data:image/jpg;base64,' + data.image;
        });
    }

    @HostListener('click', ['$event.offsetX', '$event.offsetY'])
    click(offsetX: number, offsetY: number) {
        this.points.push({
            x: offsetX,
            y: offsetY
        });
    }

    removeSelf(index: number) {
        this.points.splice(index, 1);
    }
}
