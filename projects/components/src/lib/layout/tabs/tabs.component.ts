import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OrnstioTabComponent } from './tab/tab.component';

@Component({
  selector: 'ornstio-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: OrnstioTabsComponent,
      multi: true,
    },
  ],
})
export class OrnstioTabsComponent implements OnInit {
  private _tabs: OrnstioTabComponent[];
  private _tab: OrnstioTabComponent;
  private _previousTab: OrnstioTabComponent;
  private _timeout: number;
  private _index: number;
  scroll: 'left' | 'right' | 'none';

  get previousTab(): OrnstioTabComponent {
    return this._previousTab;
  }

  @Input() set index(value: number) {
    const tab = this.tabs[value];
    if (!!tab) {
      this.tab = tab;
    }
  }
  get index(): number {
    return this._index;
  }
  @Output() indexChange = new EventEmitter<number>();

  @Input() set tab(value: OrnstioTabComponent) {
    clearTimeout(this._timeout);
    const index = this._tabs.indexOf(this._tab);
    this._previousTab = this.tabs[index];
    this._tab = value;
    this._index = this._tabs.indexOf(this._tab);
    this.scroll =
      index === -1
        ? 'none'
        : index < this.index
        ? 'left'
        : index > this.index
        ? 'right'
        : 'none';
    if (this.previousTab) {
      this.previousTab.scroll = this.scroll;
    }
    if (this.tab) {
      this.tab.scroll = this.scroll;
    }
    this._timeout = setTimeout(() => {
      this.scroll = 'none';
      if (this.previousTab) {
        this.previousTab.scroll = 'none';
        this._previousTab = null;
      }
    }, 500);
    this.tabChange.next(this.tab);
    this.indexChange.next(this.index);
  }
  get tab(): OrnstioTabComponent {
    return this._tab;
  }

  @Output() tabChange = new EventEmitter<OrnstioTabComponent>();

  @ContentChildren(OrnstioTabComponent) set setTabs(
    value: QueryList<OrnstioTabComponent>
  ) {
    this._tabs = value.toArray();
    if (!this.tab || !this._tabs.includes(this.tab)) {
      this.tab = this._tabs[0];
    }
  }
  get tabs(): OrnstioTabComponent[] {
    return this._tabs;
  }
  @Input() color: string = 'basic';
  @HostBinding('class') get classes(): string {
    return [this.color].join(' ');
  }

  constructor() {}

  ngOnInit(): void {}
}
