import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ornstio-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class OrnstioPaginatorComponent {
  @Input() length: number;

  private _pageSizes: number[];
  @Input() set pageSizes(pageSizes: number[]) {
    this._pageSizes = pageSizes;
    this.pageSize = this.pageSizes[0];
    this.pageIndex = 0;
  }
  get pageSizes(): number[] {
    return this._pageSizes;
  }

  private _pageSize: number;
  @Input() set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    if (this.pageIndex !== 0) {
      while (this.pageIndex * this.pageSize >= this.length) {
        this.pageIndex = this.previousPage;
      }
    }

    this.pageSizeChange.next(this.pageSize);
  }
  get pageSize(): number {
    return this._pageSize;
  }
  @Output() pageSizeChange = new EventEmitter<number>();

  private _pageIndex: number;
  set pageIndex(pageIndex: number) {
    this._pageIndex = pageIndex;
    this.pageIndexChange.next(this.pageIndex);
  }
  get pageIndex(): number {
    return this._pageIndex;
  }
  @Output() pageIndexChange = new EventEmitter<number>();

  get nextPage(): number {
    const nextPage = this.pageIndex * this.pageSize + this.pageSize;
    return nextPage < this.length ? this.pageIndex + 1 : this.pageIndex;
  }

  get previousPage(): number {
    const previousPage = this.pageIndex - 1;
    return previousPage < 0 ? this.pageIndex : previousPage;
  }

  firstPage(): void {
    while (this._pageIndex !== this.previousPage) {
      this._pageIndex = this.previousPage;
    }
    this.pageIndex = this._pageIndex;
  }

  lastPage(): void {
    while (this._pageIndex !== this.nextPage) {
      this._pageIndex = this.nextPage;
    }
    this.pageIndex = this._pageIndex;
  }
}
