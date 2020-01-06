import {NgModule} from '@angular/core';
import {ShareModule} from '../share/share.module';
import {VerificationCodeRoutingModule} from './verification-code-routing.module';
import {IndexComponent} from './containers/index/index.component';

@NgModule({
    imports: [
        ShareModule,
        VerificationCodeRoutingModule
    ],
    declarations: [
        IndexComponent
    ],
    providers: []
})
export class VerificationCodeModule {
}
