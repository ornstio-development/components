import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioTextAreaComponent } from './text-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioTextAreaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioTextAreaComponent],
})
export class OrnstioTextAreaModule {}
