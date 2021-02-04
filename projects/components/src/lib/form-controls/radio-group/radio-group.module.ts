import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioRadioGroupComponent } from './radio-group.component';
import { OrnstioRadioOptionComponent } from './radio-option/radio-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioRadioGroupComponent, OrnstioRadioOptionComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioRadioGroupComponent, OrnstioRadioOptionComponent],
})
export class OrnstioRadioGroupModule {}
