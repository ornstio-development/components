import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { ORNSTIO_TOOLTIP_DATA } from './tooltip.directive';

interface OrnstioTooltipData {
  value: string;
  color: string;
}

@Component({
  selector: 'ornstio-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class OrnstioTooltipComponent implements OnInit {
  @HostBinding('class') get classes(): string {
    return [this.data.color ?? 'basic'].join(' ');
  }

  constructor(@Inject(ORNSTIO_TOOLTIP_DATA) public data: OrnstioTooltipData) {}

  ngOnInit(): void {}
}
