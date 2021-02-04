import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[ornstioColumnHeader]',
})
export class OrnstioColumnHeaderDirective implements OnInit {
  @HostBinding('style.width') get styleWidth(): string {
    return this.width;
  }

  @HostBinding('style.resize') get styleResize(): string {
    return this.resize ? 'horizontal' : 'none';
  }

  private _resize: boolean;
  @Input() set resize(resize: boolean) {
    this._resize = resize;
  }
  get resize(): boolean {
    return this._resize && !!this._elementRef.nativeElement.nextElementSibling;
  }

  private _width: string;
  @Input() set width(width: string) {
    this._width = width;
    this.widthChange.next(this.width);
  }
  get width(): string {
    return this._width;
  }
  @Output() widthChange = new EventEmitter<string>();

  private _observer = new MutationObserver(() => {
    if (this.resize) {
      this.width = this._elementRef.nativeElement.style.width;
    }
  });

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._observer.observe(this._elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }
}
