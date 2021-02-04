import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {} from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrnstioRowDirective } from './row/row.directive';
import { OrnstioColumnDirective } from './column/column.directive';
import { OrnstioPaginatorComponent } from '../paginator/_paginator.index';

@Component({
  selector: 'table[ornstio-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */ () => OrnstioTableComponent
      ),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnstioTableComponent<T> implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  private _paginator$ = new Subject<void>();
  private _paginator: OrnstioPaginatorComponent;
  @Input() set paginator(paginator: OrnstioPaginatorComponent) {
    this._paginator = paginator;
    this.paginator?.pageIndexChange
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.cdr.detectChanges());
    this.paginator?.pageSizeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.cdr.detectChanges());
  }
  get paginator(): OrnstioPaginatorComponent {
    return this._paginator;
  }

  private _rows: OrnstioRowDirective<T>[];
  @ViewChildren(OrnstioRowDirective) set rows(
    rows: QueryList<OrnstioRowDirective<T>>
  ) {
    this._rows = rows.toArray();
  }
  get displayRows(): OrnstioRowDirective<T>[] {
    return this._rows;
  }
  @Output() row = new EventEmitter<OrnstioRowDirective<T>>();

  private _sortColumn: OrnstioColumnDirective<T>;
  set sortColumn(sortColumn: OrnstioColumnDirective<T>) {
    if (!sortColumn?.sort) {
      return;
    }
    this._sortColumn = sortColumn;
    this.sortColumn.toggleSort();
    for (const column of this._columns.filter((c) => c !== this.sortColumn)) {
      column.sortDirection = null;
    }
  }
  get sortColumn(): OrnstioColumnDirective<T> {
    return this._sortColumn;
  }

  private _columns: OrnstioColumnDirective<T>[];
  @ContentChildren(OrnstioColumnDirective) set columns(
    columns: QueryList<OrnstioColumnDirective<T>>
  ) {
    this._columns = columns
      .toArray()
      .map((c, i) => {
        c.index = isNaN(c.index) ? i : c.index;
        return c;
      })
      .orderBy((c) => c.index);
  }
  get displayColumns(): OrnstioColumnDirective<T>[] {
    return this._columns;
  }

  private _data: T[];
  get data(): T[] {
    return this._data;
  }

  private _filteredData: T[];
  get filteredData(): T[] {
    let filteredData = [...(this._filteredData ?? this.data ?? [])];
    if (!!this.sortColumn?.sortDirection) {
      filteredData =
        typeof this.sortColumn.sort === 'function'
          ? filteredData.sort((a, b) =>
              (this.sortColumn.sort as (
                a: T,
                b: T,
                property?: string
              ) => number)(a, b, this.sortColumn.property)
            )
          : filteredData.orderBy((d) => d[this.sortColumn?.property]);
    }
    if (this.sortColumn?.sortDirection === 'desc') {
      filteredData = filteredData.reverse();
    }
    return filteredData
      ?.skip(
        this._paginator
          ? this._paginator.pageIndex * this._paginator.pageSize
          : 0
      )
      .take(
        this._paginator ? this._paginator.pageSize : filteredData?.length ?? 0
      );
  }

  private _dataSource$ = new Subject<void>();
  private _dataSource: T[] | BehaviorSubject<T[]>;
  @Input() set dataSource(value: T[] | BehaviorSubject<T[]>) {
    this._dataSource = value;
    if (this.dataSource instanceof Observable) {
      this.dataSource
        .pipe(takeUntil(this._dataSource$))
        .subscribe((data) => (this._data = data));
    }
    if (this.dataSource instanceof Array) {
      this._data = this._dataSource as T[];
    }
  }
  get dataSource(): T[] | BehaviorSubject<T[]> {
    return this._dataSource;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  applyFilter(): void {
    this._filteredData = this.data.filter((d) =>
      this._columns.all((c) => c.applyFilter(d))
    );
    if (this._paginator) {
      this._paginator.pageIndex = 0;
      this._paginator.length = this._filteredData.length;
    }
    this.cdr.detectChanges();
  }
}
