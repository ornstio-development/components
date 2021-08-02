import {
  Component,
  forwardRef,
  HostBinding,
  Inject,
  OnInit,
} from '@angular/core';
import { OrnstioRippleDirective } from './ripple.directive';

export const ORNSTIO_RIPPLE_DATA = 'ORNSTIO_RIPPLE_DATA';

interface OrnstioRippleData {
  offsetX: number;
  offsetY: number;
}

@Component({
  selector: 'ornstio-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss'],
})
export class OrnstioRippleComponent implements OnInit {
  private _rect: DOMRect;
  private _size: number;
  private _top: number;
  private _left: number;
  @HostBinding('class') get classes(): string {
    return [this.rippleDirective.color].join(' ');
  }
  @HostBinding('style.height') get height(): string {
    return `${this._size}px`;
  }
  @HostBinding('style.width') get width(): string {
    return `${this._size}px`;
  }
  @HostBinding('style.top') get top(): string {
    return `${this._top}px`;
  }
  @HostBinding('style.left') get left(): string {
    return `${this._left}px`;
  }
  @HostBinding('style.animation') get animation(): string {
    return `ripple ${this.rippleDirective.duration}ms cubic-bezier(0, 0, 0.2, 1)`;
  }

  constructor(
    @Inject(forwardRef(() => OrnstioRippleDirective))
    private rippleDirective: OrnstioRippleDirective,
    @Inject(ORNSTIO_RIPPLE_DATA) data: OrnstioRippleData
  ) {
    this._rect =
      this.rippleDirective.elementRef.nativeElement.getBoundingClientRect();
    const point = this.rippleDirective.centered
      ? { x: this._rect.width / 2, y: this._rect.height / 2 }
      : { x: data.offsetX, y: data.offsetY };
    this._size =
      [
        this.distance(point.x, point.y, 0, 0),
        this.distance(point.x, point.y, 0, this._rect.height),
        this.distance(point.x, point.y, this._rect.width, 0),
        this.distance(point.x, point.y, this._rect.width, this._rect.height),
      ].max((_) => _) * 2;
    this._left = this.rippleDirective.centered
      ? (this._rect.width - this._size) / 2
      : data.offsetX - this._size / 2;
    this._top = this.rippleDirective.centered
      ? (this._rect.height - this._size) / 2
      : data.offsetY - this._size / 2;
  }

  ngOnInit(): void {}

  distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
