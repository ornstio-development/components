import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ornstio-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class OrnstioSpinnerComponent implements OnInit, AfterViewInit {
  @ViewChild('spinner', { static: true }) spinner: ElementRef<HTMLDivElement>;
  @ViewChild('triangle', { static: true }) triangle: ElementRef<HTMLDivElement>;
  @HostBinding('style.width') get width(): string {
    return `${this._size}px`;
  }
  @HostBinding('style.height') get height(): string {
    return `${this._size}px`;
  }
  @Input() color: string;
  @HostBinding('class') get classes(): string {
    return [this.color].join(' ');
  }
  private _size: number = 48;
  @Input() set size(size: number) {
    this._size = size;
    if (this.spinner) {
      this.spinner.nativeElement.style.borderWidth = `${this.size * 0.15}px`;
    }
  }
  get size(): number {
    return this._size;
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.size = this._size;
  }
}
