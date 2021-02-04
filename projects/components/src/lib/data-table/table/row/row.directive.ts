import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { OrnstioColumnDirective } from '../column/column.directive';

@Directive({
  selector: '[ornstioRow]',
  providers: [],
})
export class OrnstioRowDirective<T> implements OnInit {
  private _data;
  @Input() row: HTMLTableRowElement;
  @Input() index: number;
  @Input() set data(value: T) {
    this._data = value;
  }
  private _columns: OrnstioColumnDirective<T>[];
  @Input() set columns(value: OrnstioColumnDirective<T>[]) {
    this._columns = value;
    this.render();
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.render();
  }

  private render(): void {
    this._columns?.forEach((c, i) => {
      if (this.viewContainerRef.get(i)) {
        this.viewContainerRef.remove(i);
      }
      const view = this.viewContainerRef.createEmbeddedView(
        c.templateRef,
        {
          $implicit: this._data ?? ({} as T),
          row: this,
        },
        i
      );
      view.detectChanges();
    });
  }
}
