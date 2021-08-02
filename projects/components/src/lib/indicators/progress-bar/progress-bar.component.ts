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
  selector: 'ornstio-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class OrnstioProgressBarComponent implements OnInit, AfterViewInit {
  @ViewChild('progressBar', { static: true })
  progressBar: ElementRef<HTMLDivElement>;
  @Input() color: string;
  @HostBinding('class') get classes(): string {
    return [this.color].join(' ');
  }
  @HostBinding('style.height') @Input() size: string = '16px';
  @HostBinding('class.indeterminate') @Input() indeterminate: boolean = true;

  private _progress: number;
  @Input() set progress(value: number) {
    if (value > 100) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }
    this._progress = value;
    if (this.progressBar) {
      this.progressBar.nativeElement.style.transform = `translateX(-${
        100 - this._progress
      }%)`;
    }
  }
  get progress(): number {
    return this._progress;
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.progress = this._progress;
  }
}
