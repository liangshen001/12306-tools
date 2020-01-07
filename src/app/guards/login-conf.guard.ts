import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginConfApi} from '../services/api/login-conf.api';
import {ApiService} from '../services/api.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginConfGuard implements CanActivateChild {

    constructor(private loginConfApi: LoginConfApi,
                private apiService: ApiService) {}

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.apiService.request({
            api: this.loginConfApi
        }).pipe(
            map(data => !!data)
        );
    }
}
