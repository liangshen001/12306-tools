import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronStoreModule} from '@ngx-electron/store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metaReducers, reducers} from './reducers';
import {effects} from './effects';
import {ApiService} from './services/api.service';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonInterceptor} from './common-interceptor';
import {ScriptService} from './services/script.service';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {QueryZApi} from './services/api/query-z.api';
import {QueryTicketPriceApi} from './services/api/query-ticket-price.api';
import {QueryStationApi} from './services/api/query-station.api';
import {QueryTicketPriceFLApi} from './services/api/query-ticket-price-f-l.api';
import {CaptchaImage64Api} from './services/api/captcha-image64.api';
import {LoginConfApi} from './services/api/login-conf.api';
import {LeftTicketInitApi} from './services/api/left-ticket-init.api';
import {GetLoginBannerApi} from './services/api/get-login-banner.api';
import {LogdeviceApi} from './services/api/logdevice.api';
import {QueryFavoriteStationApi} from './services/api/query-favorite-station-api';


export const materialModules = [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ...materialModules,
        NgxElectronCoreModule.forRoot(),
        NgxElectronStoreModule.forRoot(),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot(effects),
        BrowserAnimationsModule
    ],
    providers: [
        ApiService,
        ScriptService,
        QueryZApi,
        QueryTicketPriceApi,
        QueryStationApi,
        QueryTicketPriceFLApi,
        CaptchaImage64Api,
        LoginConfApi,
        LeftTicketInitApi,
        GetLoginBannerApi,
        LogdeviceApi,
        QueryFavoriteStationApi,
        {provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
