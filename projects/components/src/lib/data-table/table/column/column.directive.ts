import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { OrnstioRowDirective } from '../row/row.directive';
import { OrnstioTableComponent } from '../table.component';

@Directive({
  selector: '[ornstioColumn]',
})
export class OrnstioColumnDirective<T> implements OnDestroy, OnInit {
  private _destroy$ = new Subject<void>();
  private _filter$ = new Subject<string>();
  private _element: HTMLElement;
  get element(): HTMLElement {
    return this._element;
  }

  index: number;

  sortDirection: 'asc' | 'desc';
  private _sort: boolean | ((a: T, b: T, property?: string) => number);
  @Input() set ornstioColumnSort(
    value: boolean | ((a: T, b: T, property?: string) => number)
  ) {
    if (!this.property && typeof value === 'boolean') {
      throw new Error(`'property' must be set first if using built-in sort`);
    }
    this._sort = value;
  }
  get sort(): boolean | ((a: T, b: T, property?: string) => number) {
    return this._sort;
  }

  private _headerTemplate: TemplateRef<any>;
  @Input() set ornstioColumnHeaderTemplate(value: TemplateRef<any>) {
    this._headerTemplate = value;
  }

  get headerTemplate(): TemplateRef<any> {
    return this._headerTemplate;
  }

  private _name: string;
  @Input() set ornstioColumnName(value: string) {
    this._name = value;
  }
  get name(): string {
    return this._name;
  }

  private _filter:
    | boolean
    | ((t: T, value: string, property?: string) => boolean);
  @Input() set ornstioColumnFilter(
    value: boolean | ((t: T, value: string, property?: string) => boolean)
  ) {
    if (!this.property && typeof value === 'boolean') {
      throw new Error(`'property' must be set first if using built-in filter`);
    }
    this._filter = value;
  }
  get filter():
    | boolean
    | ((t: T, value: string, property?: string) => boolean) {
    return this._filter;
  }

  private _property: string;
  @Input() set ornstioColumnProperty(value: string) {
    this._property = value;
  }
  get property(): string {
    return this._property;
  }

  private _span: number;
  @Input() set ornstioColumnSpan(value: number) {
    this._span = value;
  }
  get span(): number {
    return this._span;
  }

  private _width: string;
  @Input() set ornstioColumnWidth(value: string) {
    this._width = value;
  }
  set width(width: string) {
    this._width = width;
  }
  get width(): string {
    return this._width;
  }

  private _resize: boolean;
  @Input() set ornstioColumnResize(value: boolean) {
    this._resize = value;
  }
  get resize(): boolean {
    return this._resize;
  }

  filterValue: string;

  private _view: EmbeddedViewRef<any>;

  toggleSort(): void {
    switch (this.sortDirection) {
      case 'asc':
        this.sortDirection = 'desc';
        break;
      case 'desc':
        this.sortDirection = null;
        break;
      default:
        this.sortDirection = 'asc';
        break;
    }
  }

  constructor(
    public templateRef: TemplateRef<any>,
    public elementRef: ElementRef<HTMLElement>,
    @Inject(forwardRef(() => OrnstioTableComponent))
    private table: OrnstioTableComponent<T>
  ) {}

  ngOnInit(): void {
    this._filter$
      .pipe(takeUntil(this._destroy$), debounceTime(250))
      .subscribe((filter) => {
        this.filterValue = filter;
        this.table.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this._view?.detach();
    this._view?.destroy();
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  setFilter(filter: string): void {
    this._filter$.next(filter);
  }

  applyFilter(t: T): boolean {
    return typeof this.filter === 'function'
      ? this.filter(t, this.filterValue, this.property)
      : !this.filterValue ||
          `${t[this.property] ?? ''}`?.search(
            new RegExp(this.filterValue, 'i')
          ) > -1;
  }
}
