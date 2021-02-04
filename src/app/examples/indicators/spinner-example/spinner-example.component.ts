import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-spinner-example',
  templateUrl: './spinner-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './spinner-example.component.scss',
  ],
})
export class SpinnerExampleComponent
  extends ExampleComponent
  implements OnInit {
  apis = [
    {
      name: '@Input() size: number',
      description: 'Sets the size of the spinner',
    },
    {
      name: '@Input() color: <a href="./setup/theming">ThemeColor</a>',
      description: 'Sets the color of the spinner',
    },
  ];

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  size: number = 48;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
