import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginConfApi} from '../../../../services/api/login-conf.api';
import {ApiService} from '../../../../services/api.service';
import {NgxElectronService} from '@ngx-electron/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnDestroy {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef,
                private ngxElectronService: NgxElectronService,
                media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    openCode() {
        let win = this.ngxElectronService.createWindow('verification-code', 'verification-code', {
            width: 330,
            height: 300,
            title: '验证码'
        });
        this.ngxElectronService.data().subscribe((data) => {
            debugger;
        });
    }
}
