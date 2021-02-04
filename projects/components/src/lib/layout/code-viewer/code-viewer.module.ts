import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioCodeViewerComponent } from './code-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrnstioCodeViewerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OrnstioCodeViewerComponent],
})
export class OrnstioCodeViewerModule {}
