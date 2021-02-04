import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  Routes,
} from '@angular/router';
import { from } from 'rxjs';
import { PaginatorExampleComponent } from './examples/data-table/paginator-example/paginator-example.component';
import { TableExampleComponent } from './examples/data-table/table-example/table-example.component';
import { LangExampleComponent } from './examples/enums/lang-example/lang-example.component';
import { SizeExampleComponent } from './examples/enums/size-example/size-example.component';
import { TooltipPositionExampleComponent } from './examples/enums/tooltip-position-example/tooltip-position-example.component';
import { ButtonExampleComponent } from './examples/form-controls/button-example/button-example.component';
import { CheckboxExampleComponent } from './examples/form-controls/checkbox-example/checkbox-example.component';
import { InputExampleComponent } from './examples/form-controls/input-example/input-example.component';
import { RadioGroupExampleComponent } from './examples/form-controls/radio-group-example/radio-group-example.component';
import { RippleExampleComponent } from './examples/form-controls/ripple-example/ripple-example.component';
import { SelectExampleComponent } from './examples/form-controls/select-example/select-example.component';
import { SwitchExampleComponent } from './examples/form-controls/switch-example/switch-example.component';
import { TextAreaExampleComponent } from './examples/form-controls/text-area-example/text-area-example.component';
import { ProgressBarExampleComponent } from './examples/indicators/progress-bar-example/progress-bar-example.component';
import { SpinnerExampleComponent } from './examples/indicators/spinner-example/spinner-example.component';
import { CodeViewerExampleComponent } from './examples/layout/code-viewer-example/code-viewer-example.component';
import { TabsExampleComponent } from './examples/layout/tabs-example/tabs-example.component';
import { DialogExampleComponent } from './examples/modals/dialog-example/dialog-example.component';
import { ToastExampleComponent } from './examples/modals/toast-example/toast-example.component';
import { TooltipExampleComponent } from './examples/modals/tooltip-example/tooltip-example.component';
import { ThemingComponent } from './setup/theming/theming.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  static readonly setupRoutes: Routes = [
    {
      path: 'theming',
      component: ThemingComponent,
      data: { name: 'theming' },
    },
  ];
  get setupLinks(): { name: string; routerLink: string }[] {
    return AppComponent.setupRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./setup/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  static readonly formControlRoutes: Routes = [
    {
      path: 'button',
      component: ButtonExampleComponent,
      data: { name: 'button' },
    },
    {
      path: 'input',
      component: InputExampleComponent,
      data: { name: 'input' },
    },
    {
      path: 'select',
      component: SelectExampleComponent,
      data: { name: 'select' },
    },
    {
      path: 'radio-group',
      component: RadioGroupExampleComponent,
      data: { name: 'radio group' },
    },
    {
      path: 'checkbox',
      component: CheckboxExampleComponent,
      data: { name: 'checkbox' },
    },

    {
      path: 'ripple',
      component: RippleExampleComponent,
      data: { name: 'ripple' },
    },
    {
      path: 'text-area',
      component: TextAreaExampleComponent,
      data: { name: 'textarea' },
    },
    {
      path: 'switch',
      component: SwitchExampleComponent,
      data: { name: 'switch' },
    },
  ];
  get formControlLinks(): { name: string; routerLink: string }[] {
    return AppComponent.formControlRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./form-controls/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  static readonly indicatorRoutes: Routes = [
    {
      path: 'spinner',
      component: SpinnerExampleComponent,
      data: { name: 'spinner' },
    },
    {
      path: 'progress-bar',
      component: ProgressBarExampleComponent,
      data: { name: 'progress bar' },
    },
  ];
  get indicatorLinks(): { name: string; routerLink: string }[] {
    return AppComponent.indicatorRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./indicators/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  static readonly layoutRoutes: Routes = [
    {
      path: 'code-viewer',
      component: CodeViewerExampleComponent,
      data: { name: 'code viewer' },
    },
    {
      path: 'tabs',
      component: TabsExampleComponent,
      data: { name: 'tabs' },
    },
  ];
  get layoutLinks(): { name: string; routerLink: string }[] {
    return AppComponent.layoutRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./layout/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  static readonly modalRoutes: Routes = [
    {
      path: 'dialog',
      component: DialogExampleComponent,
      data: { name: 'dialog' },
    },
    {
      path: 'toast',
      component: ToastExampleComponent,
      data: { name: 'toast' },
    },
    {
      path: 'tooltip',
      component: TooltipExampleComponent,
      data: { name: 'tooltip' },
    },
  ];
  get modalLinks(): { name: string; routerLink: string }[] {
    return AppComponent.modalRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./modals/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  static readonly enumRoutes: Routes = [
    {
      path: 'size',
      component: SizeExampleComponent,
      data: { name: 'size' },
    },
    {
      path: 'lang',
      component: LangExampleComponent,
      data: { name: 'lang' },
    },
    {
      path: 'tooltip-position',
      component: TooltipPositionExampleComponent,
      data: { name: 'tooltip position' },
    },
  ];
  get enumLinks(): { name: string; routerLink: string }[] {
    return AppComponent.enumRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./enums/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  static readonly dataTableRoutes: Routes = [
    {
      path: 'table',
      component: TableExampleComponent,
      data: { name: 'table' },
    },
    {
      path: 'paginator',
      component: PaginatorExampleComponent,
      data: { name: 'paginator' },
    },
  ];
  get dataTableLinks(): { name: string; routerLink: string }[] {
    return AppComponent.dataTableRoutes
      .map((route) => ({
        name: route.data.name,
        routerLink: `./data-table/${route.path}`,
      }))
      .orderBy((_) => _.name);
  }

  routeName: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((_) => {
      this.routeName = this.setRouteName(this.route.snapshot);
    });
  }

  ngOnInit(): void {}

  setRouteName(route: ActivatedRouteSnapshot): string {
    if (route.data.name) {
      return route.data.name;
    }
    for (const child of route.children) {
      return this.setRouteName(child);
    }
    return null;
  }
}
