import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  OrnstioCodeViewerComponent,
  OrnstioLang,
  OrnstioTabComponent,
  OrnstioTabsComponent,
} from 'components';
import { tap } from 'rxjs/operators';

export abstract class ExampleComponent {
  private readonly githubUrl =
    'https://raw.githubusercontent.com/ornstio-development/components/master/src/app/examples';
  abstract apis: { name: string; description: string }[];
  html: string;
  scss: string;
  ts: string;
  showCode: boolean;

  constructor(httpClient: HttpClient) {
    const component = location.pathname.split('/').last();
    httpClient
      .get(
        `${this.githubUrl}${location.pathname}-example/${component}-example.component.html`,
        { responseType: 'text' }
      )
      .subscribe((html) => (this.html = html));
    httpClient
      .get(
        `${this.githubUrl}${location.pathname}-example/${component}-example.component.scss`,
        { responseType: 'text' }
      )
      .subscribe((scss) => (this.scss = scss));
    httpClient
      .get(
        `${this.githubUrl}${location.pathname}-example/${component}-example.component.ts`,
        { responseType: 'text' }
      )
      .subscribe((ts) => (this.ts = ts));
  }
}
