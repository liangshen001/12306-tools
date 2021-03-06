import {Component, OnInit} from '@angular/core';
import {NgxElectronStoreService} from '@ngx-electron/store';
import {select, Store} from '@ngrx/store';
import {getAllUsers, UserReducerState} from '../../../../reducers/user.reducer';
import {DeleteUser, LoadUserList, LoadUserListSuccess} from '../../../../actions/user.action';
import {map, take} from 'rxjs/operators';
import {ApiService} from '../../../../services/api.service';

@Component({
    selector: 'app-page1',
    templateUrl: './page1-index.component.html'
})
export class Page1IndexComponent implements OnInit {
    title = 'page1';

    constructor(private store$: Store<UserReducerState>,
                private apiService: ApiService,
                private electronDataService: NgxElectronStoreService) {}

    ngOnInit(): void {
        this.store$.dispatch(new LoadUserList());
    }

    openPage2() {
        // 打开页面并把所有的user数据传输过去
        this.electronDataService.openPage('page2', {
            width: 1024,
            height: 768
        }, {
            actions: [
                this.store$.pipe(
                    select(getAllUsers),
                    map(users => new LoadUserListSuccess(users)),
                    take(1)
                )
            ]
        });
    }
}
