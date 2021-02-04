import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrnstioDialogService } from './dialog.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ornstio-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class OrnstioDialogComponent implements OnInit, OnDestroy {
  @Input() header: string;
  @Input() closeable = true;
  private _destroy$ = new Subject<void>();

  constructor(public dialogService: OrnstioDialogService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
