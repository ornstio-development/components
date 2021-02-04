import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [OrnstioProgressBarComponent],
  imports: [CommonModule],
  exports: [OrnstioProgressBarComponent],
})
export class OrnstioProgressBarModule {}
