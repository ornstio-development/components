import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['../../example.component.scss', './tabs-example.component.scss'],
})
export class TabsExampleComponent extends ExampleComponent implements OnInit {
  apis = [
    {
      name: `@Input() color: <a href="./setup/theming">ThemeColor</a>`,
      description: `Sets the color of the control`,
    },
    {
      name: '@Input() tab: OrnstioTabComponent',
      description: 'Two way data-binding to get/set active tab',
    },
    {
      name: '@Input() index: OrnstioTabComponent',
      description: 'Two way data-binding to get/set active tab by index',
    },
    {
      name: '@Output() tabChange: OrnstioTabComponent',
      description: 'Emits when the tab of the control is changed',
    },
    {
      name: '@Output() indexChange: OrnstioTabComponent',
      description: 'Emits when the index of the control is changed',
    },
  ];
  tabApis = [
    {
      name: '@Input() name: string',
      description: 'Sets the name of the tab',
    },
  ];
  codeContainer: ElementRef<HTMLElement>;

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
