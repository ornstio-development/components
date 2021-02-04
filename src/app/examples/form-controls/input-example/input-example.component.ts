import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OrnstioSize } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-input-example',
  templateUrl: './input-example.component.html',
  styleUrls: ['../../example.component.scss', './input-example.component.scss'],
})
export class InputExampleComponent extends ExampleComponent implements OnInit {
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
      name: `@Input() size: <a href="./enums/OrnstioSize" target="_self">OrnstioSize</a>`,
      description: `Sets the size of the control. Default is 'medium' `,
    },
    {
      name: '@Input() type: HTMLInputElement.type',
      description: 'Sets the type of input allowed by the control',
    },
    {
      name: '@Input() placeholder: string',
      description: 'Sets the placeholder of the control',
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
      name: '@Input() prefix: string',
      description: 'Sets the prefix icon to a Material icon',
    },
    {
      name: '@Input() suffix: boolean',
      description: 'Sets the suffix icon to a Material icon',
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
  readonly: boolean = false;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
