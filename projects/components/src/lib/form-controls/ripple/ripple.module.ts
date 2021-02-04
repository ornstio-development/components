import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioRippleDirective } from './ripple.directive';

@NgModule({
  declarations: [OrnstioRippleDirective],
  imports: [CommonModule],
  exports: [OrnstioRippleDirective],
})
export class OrnstioRippleModule {}
