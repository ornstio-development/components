import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OrnstioSelectComponent,
  OrnstioDropdownComponent,
} from './select.component';
import { OrnstioOptionComponent } from './option/option.component';
import { OrnstioInputModule } from '../input/input.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OrnstioLabelModule } from '../label/label.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrnstioSelectComponent,
    OrnstioOptionComponent,
    OrnstioDropdownComponent,
  ],
  imports: [
    CommonModule,
    OrnstioInputModule,
    OverlayModule,
    PortalModule,
    OrnstioLabelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [OrnstioSelectComponent, OrnstioOptionComponent],
})
export class OrnstioSelectModule {}
