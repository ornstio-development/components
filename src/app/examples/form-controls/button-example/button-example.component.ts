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
  selector: 'app-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './button-example.component.scss',
  ],
})
export class ButtonExampleComponent extends ExampleComponent implements OnInit {
  readonly apis = [
    { name: '@Input() disabled: boolean', description: 'Disables the control' },
    {
      name: `@Input() size: <a href="./enums/size">OrnstioSize</a>`,
      description: `Sets the size of the control. Default is 'medium' `,
    },
    {
      name: `@Input() color: <a href="./setup/theming">ThemeColor</a>`,
      description: `Sets the color of the control`,
    },
  ];
  @ViewChild('codeContainer', { static: true })
  codeContainer: ElementRef<HTMLElement>;

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  sizes = Object.keys(OrnstioSize).map((key) => OrnstioSize[key]);
  size: OrnstioSize = OrnstioSize.Large;
  disabled: boolean = false;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
