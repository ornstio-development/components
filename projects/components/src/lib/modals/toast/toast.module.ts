import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioToastService } from './toast.service';
import { OrnstioToastComponent } from './toast.component';
import { OrnstioButtonModule } from '../../form-controls/button/button.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [OrnstioToastComponent],
  imports: [CommonModule, OrnstioButtonModule, OverlayModule],
  exports: [OrnstioToastComponent],
  providers: [OrnstioToastService],
})
export class OrnstioToastModule {}
