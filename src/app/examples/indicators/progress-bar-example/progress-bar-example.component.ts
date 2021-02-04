import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-progress-bar-example',
  templateUrl: './progress-bar-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './progress-bar-example.component.scss',
  ],
})
export class ProgressBarExampleComponent
  extends ExampleComponent
  implements OnInit {
  apis = [
    {
      name: '@Input() size: number',
      description: 'Sets the size of the progress bar',
    },
    {
      name: '@Input() color: <a href="./setup/theming">ThemeColor</a>',
      description: 'Sets the color of the progress bar',
    },
    {
      name: '@Input() progress: number',
      description: 'Sets the progress of the control if not indeterminate',
    },
    {
      name: '@Input() indeterminate: boolean',
      description: 'Sets the state of the control to be indeterminate',
    },
  ];

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  size: string = '16px';
  progress: number = 60;
  indeterminate: boolean = false;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
