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
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-radio-group-example',
  templateUrl: './radio-group-example.component.html',
  styleUrls: [
    './radio-group-example.component.scss',
    '../../example.component.scss',
  ],
})
export class RadioGroupExampleComponent
  extends ExampleComponent
  implements OnInit {
  values = [
    { name: 'Horse', id: 1 },
    { name: 'Hippopotamus', id: 2 },
    { name: 'Tiger', id: 4 },
    { name: 'Lion', id: 3 },
  ];
  value: { name: string; id: number };
  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  disabled: boolean = false;

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
      name: `@Input() color: <a href="./setup/theming">ThemeColor</a>`,
      description: `Sets the color of the control`,
    },
    {
      name: '@Output() valueChange: any',
      description: 'Emits the value of the control on change',
    },
  ];

  @ViewChild('codeContainer', { static: true })
  codeContainer: ElementRef<HTMLElement>;

  readonly optionApis = [
    {
      name: '@Input() value: any',
      description: 'Value of option',
    },
    { name: '@Input() disabled: boolean', description: 'Disables the option' },
  ];

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
