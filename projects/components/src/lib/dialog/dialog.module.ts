import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioDialogComponent } from './dialog.component';
import { OrnstioDialogService } from './dialog.service';
import { OrnstioDialogDirective } from './dialog.directive';

@NgModule({
  declarations: [OrnstioDialogComponent, OrnstioDialogDirective],
  imports: [CommonModule],
  exports: [OrnstioDialogComponent, OrnstioDialogDirective],
  providers: [OrnstioDialogService],
})
export class OrnstioDialogModule {}
