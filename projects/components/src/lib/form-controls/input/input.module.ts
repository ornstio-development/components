import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioInputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioInputComponent],
})
export class OrnstioInputModule {}
