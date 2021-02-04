import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OrnstioSize } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-text-area-example',
  templateUrl: './text-area-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './text-area-example.component.scss',
  ],
})
export class TextAreaExampleComponent
  extends ExampleComponent
  implements OnInit {
  readonly apis = [
    {
      name: '@Input() value: string | number',
      description: 'Two-way data binding to input',
    },
    { name: '@Input() disabled: boolean', description: 'Disables the control' },
    {
      name: '@Input() readonly: boolean',
      description: 'Marks the control as read-only',
    },
    {
      name: '@Input() control: AbstractControl',
      description: 'Connects control to an AbstractControl',
    },
    {
      name: `@Input() color: <a href="./setup/theming">ThemeColor</a>`,
      description: `Sets the color of the control`,
    },
    {
      name: '@Input() error: boolean',
      description:
        'Sets the error state of the input. Also driven by control.invalid if connected',
    },
    {
      name: '@Input() rows: number',
      description: 'Sets the default rows displayed. Default is 2',
    },
    {
      name: '@Input() resize: boolean',
      description: 'Toggles resize of control',
    },
    {
      name: '@Output() valueChange: string | number',
      description: 'Emits the value of the control on change',
    },
  ];

  value: string = 'Hello World';
  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  sizes = Object.keys(OrnstioSize).map((key) => OrnstioSize[key]);
  size: OrnstioSize = OrnstioSize.Large;
  prefix: boolean = false;
  suffix: boolean = false;
  error: boolean = false;
  disabled: boolean = false;
  rows: number = 2;
  resize: boolean = true;
  readonly: boolean = false;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
