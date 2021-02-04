import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrnstioTooltipPosition } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-tooltip-example',
  templateUrl: './tooltip-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './tooltip-example.component.scss',
  ],
})
export class TooltipExampleComponent
  extends ExampleComponent
  implements OnInit {
  apis = [
    {
      name: '@Input() tooltipDelay: number',
      description: 'Sets the delay for the tooltip in milliseconds',
    },
    {
      name:
        '@Input() tooltipPosition: <a href="./enums/tooltip-position">OrnstioTooltipPosition</a>',
      description: 'Sets the position of the tooltip',
    },
    {
      name: '@Input() tooltipColor: <a href="./setup/theming">ThemeColor</a>',
      description: 'Sets the background color of the tooltip',
    },
  ];
  tooltipPositions = Object.keys(OrnstioTooltipPosition).map(
    (key) => OrnstioTooltipPosition[key]
  );
  tooltipPosition: OrnstioTooltipPosition = OrnstioTooltipPosition.Left;
  tooltipColors = ['primary', 'secondary', 'warn', 'basic'];
  tooltipColor: string = 'basic';
  tooltipDelay: number = 0;
  value: string = 'This is my tooltip';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
