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
  selector: 'app-ripple-example',
  templateUrl: './ripple-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './ripple-example.component.scss',
  ],
})
export class RippleExampleComponent extends ExampleComponent implements OnInit {
  readonly apis = [
    {
      name: '@Input() duration',
      description: 'Duration of the ripple in ms',
    },
    {
      name: '@Input() centered',
      description:
        'Determines if ripple origin starts at center or mouse location',
    },
    { name: '@Input() disabled: boolean', description: 'Disables the control' },
    {
      name: `@Input() color: <a href="./setup/theming">ThemeColor</a>`,
      description: `Sets the color of the control`,
    },
  ];

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  disabled: boolean = false;
  duration: number = 500;
  centered: boolean = false;

  @ViewChild('codeContainer', { static: true })
  codeContainer: ElementRef<HTMLElement>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
