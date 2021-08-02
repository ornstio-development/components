import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  OrnstioInputModule,
  OrnstioFormFieldModule,
  OrnstioLabelModule,
  OrnstioCardModule,
  OrnstioSelectModule,
  OrnstioRadioGroupModule,
  OrnstioCheckboxModule,
  OrnstioCodeViewerModule,
  OrnstioButtonModule,
  OrnstioRippleModule,
  OrnstioTabsModule,
  OrnstioTextAreaModule,
  OrnstioTableModule,
  OrnstioPaginatorModule,
  OrnstioSwitchModule,
  OrnstioDialogModule,
  OrnstioToastModule,
  OrnstioTooltipModule,
  OrnstioSpinnerModule,
  OrnstioProgressBarModule,
} from 'components';
import { InputExampleComponent } from './examples/form-controls/input-example/input-example.component';
import { RouterModule } from '@angular/router';
import { SelectExampleComponent } from './examples/form-controls/select-example/select-example.component';
import { ApiTableComponent } from './core/api-table/api-table.component';
import { RadioGroupExampleComponent } from './examples/form-controls/radio-group-example/radio-group-example.component';
import { CheckboxExampleComponent } from './examples/form-controls/checkbox-example/checkbox-example.component';
import { CodeViewerExampleComponent } from './examples/layout/code-viewer-example/code-viewer-example.component';
import { LangExampleComponent } from './examples/enums/lang-example/lang-example.component';
import { SizeExampleComponent } from './examples/enums/size-example/size-example.component';
import { ButtonExampleComponent } from './examples/form-controls/button-example/button-example.component';
import { RippleExampleComponent } from './examples/form-controls/ripple-example/ripple-example.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsExampleComponent } from './examples/layout/tabs-example/tabs-example.component';
import { TextAreaExampleComponent } from './examples/form-controls/text-area-example/text-area-example.component';
import { TableExampleComponent } from './examples/data-table/table-example/table-example.component';
import { PaginatorExampleComponent } from './examples/data-table/paginator-example/paginator-example.component';
import { SwitchExampleComponent } from './examples/form-controls/switch-example/switch-example.component';
import { ThemingComponent } from './setup/theming/theming.component';
import {
  DialogExampleComponent,
  DialogContentComponent,
} from './examples/modals/dialog-example/dialog-example.component';
import {
  ToastContentComponent,
  ToastExampleComponent,
} from './examples/modals/toast-example/toast-example.component';
import { TooltipExampleComponent } from './examples/modals/tooltip-example/tooltip-example.component';
import { TooltipPositionExampleComponent } from './examples/enums/tooltip-position-example/tooltip-position-example.component';
import { SpinnerExampleComponent } from './examples/indicators/spinner-example/spinner-example.component';
import { ProgressBarExampleComponent } from './examples/indicators/progress-bar-example/progress-bar-example.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InputExampleComponent,
    SelectExampleComponent,
    ApiTableComponent,
    RadioGroupExampleComponent,
    CheckboxExampleComponent,
    CodeViewerExampleComponent,
    LangExampleComponent,
    SizeExampleComponent,
    ButtonExampleComponent,
    RippleExampleComponent,
    TabsExampleComponent,
    TextAreaExampleComponent,
    TableExampleComponent,
    PaginatorExampleComponent,
    SwitchExampleComponent,
    ThemingComponent,
    DialogExampleComponent,
    DialogContentComponent,
    ToastExampleComponent,
    ToastContentComponent,
    TooltipExampleComponent,
    TooltipPositionExampleComponent,
    SpinnerExampleComponent,
    ProgressBarExampleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OrnstioInputModule,
    OrnstioFormFieldModule,
    OrnstioLabelModule,
    OrnstioCardModule,
    OrnstioSelectModule,
    OrnstioRadioGroupModule,
    OrnstioCheckboxModule,
    OrnstioCodeViewerModule,
    OrnstioButtonModule,
    OrnstioRippleModule,
    OrnstioTabsModule,
    OrnstioTextAreaModule,
    OrnstioTableModule,
    OrnstioPaginatorModule,
    OrnstioSwitchModule,
    OrnstioDialogModule,
    OrnstioToastModule,
    OrnstioTooltipModule,
    OrnstioSpinnerModule,
    OrnstioProgressBarModule,
    RouterModule.forRoot([
      {
        path: 'modals',
        children: AppComponent.modalRoutes.concat([
          {
            path: '**',
            redirectTo: AppComponent.modalRoutes.first().path,
          },
        ]),
      },
      {
        path: 'setup',
        children: AppComponent.setupRoutes.concat([
          {
            path: '**',
            redirectTo: AppComponent.setupRoutes.first().path,
          },
        ]),
      },
      {
        path: 'indicators',
        children: AppComponent.indicatorRoutes.concat([
          {
            path: '**',
            redirectTo: AppComponent.indicatorRoutes.first().path,
          },
        ]),
      },
      {
        path: 'form-controls',
        children: AppComponent.formControlRoutes.concat([
          {
            path: '**',
            redirectTo: AppComponent.formControlRoutes.first().path,
          },
        ]),
      },
      {
        path: 'layout',
        children: AppComponent.layoutRoutes.concat([
          { path: '**', redirectTo: AppComponent.layoutRoutes.first().path },
        ]),
      },
      {
        path: 'data-table',
        children: AppComponent.dataTableRoutes.concat([
          {
            path: '**',
            redirectTo: AppComponent.dataTableRoutes.first().path,
          },
        ]),
      },
      {
        path: 'enums',
        children: AppComponent.enumRoutes.concat([
          { path: '**', redirectTo: AppComponent.enumRoutes.first().path },
        ]),
      },
      {
        path: '**',
        redirectTo: `form-controls/${
          AppComponent.formControlRoutes.first().path
        }`,
      },
    ]),
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
