import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioCheckboxComponent } from './checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioCheckboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioCheckboxComponent],
})
export class OrnstioCheckboxModule {}
