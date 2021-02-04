import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioFormFieldComponent } from './form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioFormFieldComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioFormFieldComponent],
})
export class OrnstioFormFieldModule {}
