import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { OrnstioSize } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-select-example',
  templateUrl: './select-example.component.html',
  styleUrls: [
    './select-example.component.scss',
    '../../example.component.scss',
  ],
})
export class SelectExampleComponent extends ExampleComponent implements OnInit {
  readonly apis = [
    {
      name: '@Input() value: any',
      description: 'Two-way data binding to input',
    },
    { name: '@Input() disabled: boolean', description: 'Disables the control' },
    {
      name: '@Input() control: AbstractControl',
      description: 'Connects control to an AbstractControl',
    },
    {
      name: `@Input() size: <a href="./enums/size">OrnstioSize</a>`,
      description: `Sets the size of the control. Default is 'medium' `,
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
      name: '@Output() valueChange: any',
      description: 'Emits the value of the control on change',
    },
  ];

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  sizes = Object.keys(OrnstioSize).map((key) => OrnstioSize[key]);
  size: OrnstioSize = OrnstioSize.Large;
  error: boolean = false;
  disabled: boolean = false;

  values = [
    { name: '--', value: null },
    { name: 'Hippopotamus', value: 'Hippopotamus' },
    { name: 'Horse', value: 'Horse' },
    { name: 'Lion', value: 'Lion' },
    { name: 'Tiger', value: 'Tiger' },
  ];

  @ViewChild('codeContainer', { static: true })
  codeContainer: ElementRef<HTMLElement>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
