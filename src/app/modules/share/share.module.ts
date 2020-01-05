import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronStoreModule} from '@ngx-electron/store';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import {components} from './components';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule, MatDateFormats,
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
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
    MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, NativeDateAdapter
} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {materialModules} from '../../app.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY MMM'
    }
};

@NgModule({
    imports: [
        CommonModule,
        NgxElectronCoreModule,
        NgxElectronStoreModule,
        FormsModule,
        ReactiveFormsModule,
        ...materialModules
    ],
    declarations: [
        ...components
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    ],
    exports: [
        CommonModule,
        NgxElectronCoreModule,
        NgxElectronStoreModule,
        FormsModule,
        ReactiveFormsModule,
        ...components,
        ...materialModules
    ]
})
export class ShareModule {
}
