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
import { OrnstioLang } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-code-viewer-example',
  templateUrl: './code-viewer-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './code-viewer-example.component.scss',
  ],
})
export class CodeViewerExampleComponent
  extends ExampleComponent
  implements OnInit {
  code = `<div class="container">
  <p>Hello world</p>
</div>`;
  lang = OrnstioLang.html;

  apis = [
    {
      name: '@Input() code: string',
      description: 'Formatted code block to be displayed',
    },
    {
      name: '@Input() lang: <a href="./enums/lang">OrnstioLang</a>',
      description: 'Language of the code',
    },
  ];

  @ViewChild('codeContainer', { static: true })
  codeContainer: ElementRef<HTMLElement>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
