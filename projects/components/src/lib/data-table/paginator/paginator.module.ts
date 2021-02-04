import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioPaginatorComponent } from './paginator.component';
import { OrnstioSelectModule } from '../../form-controls/select/select.module';
import { OrnstioLabelModule } from '../../form-controls/label/label.module';
import { OrnstioButtonModule } from '../../form-controls/button/button.module';

@NgModule({
  declarations: [OrnstioPaginatorComponent],
  imports: [
    CommonModule,
    OrnstioSelectModule,
    OrnstioLabelModule,
    OrnstioButtonModule,
  ],
  exports: [OrnstioPaginatorComponent],
})
export class OrnstioPaginatorModule {}
