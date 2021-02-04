import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioTooltipDirective } from './tooltip.directive';
import { OrnstioTooltipComponent } from './tooltip.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [OrnstioTooltipDirective, OrnstioTooltipComponent],
  imports: [CommonModule, OverlayModule],
  exports: [OrnstioTooltipDirective, OrnstioTooltipComponent],
})
export class OrnstioTooltipModule {}
