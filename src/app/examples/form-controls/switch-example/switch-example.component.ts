import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrnstioSize } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-switch-example',
  templateUrl: './switch-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './switch-example.component.scss',
  ],
})
export class SwitchExampleComponent extends ExampleComponent implements OnInit {
  apis = [
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
      name: `@Input() color: <a href="./setup/theming">ThemeColor</a>`,
      description: `Sets the color of the control`,
    },
    {
      name: '@Output() valueChange: any',
      description: 'Emits the value of the control on change',
    },
  ];
  value: boolean = true;
  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  sizes = Object.keys(OrnstioSize).map((key) => OrnstioSize[key]);
  size: OrnstioSize = OrnstioSize.Medium;
  disabled: boolean = false;
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
