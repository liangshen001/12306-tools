import {NgModule} from '@angular/core';
import {ShareModule} from '../share/share.module';
import {VerificationCodeRoutingModule} from './verification-code-routing.module';
import {IndexComponent} from './containers/index/index.component';
import { CodeComponent } from './components/code/code.component';

@NgModule({
    imports: [
        ShareModule,
        VerificationCodeRoutingModule
    ],
    declarations: [
        IndexComponent,
        CodeComponent
    ],
    providers: []
})
export class VerificationCodeModule {
}
