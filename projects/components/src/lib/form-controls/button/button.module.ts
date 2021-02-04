import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioButtonComponent } from './button.component';
import { OrnstioRippleModule } from '../ripple/ripple.module';

@NgModule({
  declarations: [OrnstioButtonComponent],
  imports: [CommonModule, OrnstioRippleModule],
  exports: [OrnstioButtonComponent],
})
export class OrnstioButtonModule {}
