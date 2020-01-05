import {NgModule} from '@angular/core';
import {ShareModule} from '../share/share.module';
import { IndexComponent } from './containers/index/index.component';
import {MainRoutingModule} from './main-routing.module';
import { TicketQueryComponent } from './components/ticket-query/ticket-query.component';
import { SeatStatusColorPipe } from './pipes/seat-status-color.pipe';

@NgModule({
    imports: [
        ShareModule,
        MainRoutingModule
    ],
    declarations: [
        IndexComponent,
        TicketQueryComponent,
        SeatStatusColorPipe
    ],
    providers: []
})
export class MainModule {
}
