import { Component, OnInit } from '@angular/core';
import { OrnstioTooltipPosition } from 'components';

@Component({
  selector: 'app-tooltip-position-example',
  templateUrl: './tooltip-position-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './tooltip-position-example.component.scss',
  ],
})
export class TooltipPositionExampleComponent implements OnInit {
  readonly values = Object.keys(OrnstioTooltipPosition).map((key) => ({
    name: key,
    description: OrnstioTooltipPosition[key],
  }));

  constructor() {}

  ngOnInit(): void {}
}
