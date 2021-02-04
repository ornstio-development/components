import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnstioTabsComponent } from './tabs.component';
import { OrnstioTabComponent } from './tab/tab.component';

@NgModule({
  declarations: [OrnstioTabsComponent, OrnstioTabComponent],
  imports: [CommonModule],
  exports: [OrnstioTabsComponent, OrnstioTabComponent],
})
export class OrnstioTabsModule {}
