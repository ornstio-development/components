import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioTableComponent } from './table.component';
import { OrnstioRowDirective } from './row/row.directive';
import { OrnstioColumnDirective } from './column/column.directive';
import { OrnstioInputModule } from '../../form-controls/input/input.module';
import { OrnstioLabelModule } from '../../form-controls/label/label.module';
import { OrnstioPaginatorModule } from '../paginator/paginator.module';
import { OrnstioColumnHeaderDirective } from './column-header/column-header.directive';
import { OrnstioFormFieldModule } from '../../form-controls/form-field/form-field.module';

@NgModule({
  declarations: [
    OrnstioTableComponent,
    OrnstioRowDirective,
    OrnstioColumnDirective,
    OrnstioColumnHeaderDirective,
  ],
  imports: [
    CommonModule,
    OrnstioFormFieldModule,
    OrnstioInputModule,
    OrnstioLabelModule,
    OrnstioPaginatorModule,
  ],
  exports: [
    OrnstioTableComponent,
    OrnstioRowDirective,
    OrnstioColumnDirective,
    OrnstioColumnHeaderDirective,
  ],
})
export class OrnstioTableModule {}
