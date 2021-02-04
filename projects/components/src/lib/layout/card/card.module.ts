import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioCardComponent } from './card.component';
import { OrnstioCardHeaderComponent } from './card-header/card-header.component';
import { OrnstioCardContentComponent } from './card-content/card-content.component';
import { OrnstioCardFooterComponent } from './card-footer/card-footer.component';

@NgModule({
  declarations: [
    OrnstioCardComponent,
    OrnstioCardHeaderComponent,
    OrnstioCardContentComponent,
    OrnstioCardFooterComponent,
  ],
  imports: [CommonModule],
  exports: [
    OrnstioCardComponent,
    OrnstioCardHeaderComponent,
    OrnstioCardContentComponent,
    OrnstioCardFooterComponent,
  ],
})
export class OrnstioCardModule {}
