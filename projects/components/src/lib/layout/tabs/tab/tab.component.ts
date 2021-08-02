import {
  Component,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { OrnstioTabsComponent } from '../tabs.component';

@Component({
  selector: 'ornstio-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class OrnstioTabComponent implements OnInit {
  @Input() name: string;
  @HostBinding('class') get classes(): string {
    return [
      this.active ? 'active' : 'inactive',
      this.scroll,
      this === this.tabsComponent.previousTab ? 'prev' : 'none',
    ].join(' ');
  }
  @HostBinding('style.display') get display(): string {
    return this.active || this === this.tabsComponent.previousTab
      ? 'inline-block'
      : 'none';
  }
  scroll: 'left' | 'right' | 'none' = 'none';

  get active(): boolean {
    return this === this.tabsComponent.tab;
  }

  constructor(
    @Inject(forwardRef(() => OrnstioTabsComponent))
    private tabsComponent: OrnstioTabsComponent
  ) {}

  ngOnInit(): void {}
}
