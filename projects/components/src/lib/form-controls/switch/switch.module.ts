import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioSwitchComponent } from './switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioSwitchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioSwitchComponent],
})
export class OrnstioSwitchModule {}
