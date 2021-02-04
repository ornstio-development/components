import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioDialogService } from './dialog.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [],
  imports: [CommonModule, OverlayModule],
  providers: [OrnstioDialogService],
})
export class OrnstioDialogModule {}
