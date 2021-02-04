import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioSpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [OrnstioSpinnerComponent],
  imports: [CommonModule],
  exports: [OrnstioSpinnerComponent],
})
export class OrnstioSpinnerModule {}
