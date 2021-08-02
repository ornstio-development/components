import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { OrnstioSize } from '../../enums/_enums.index';
import { OrnstioRippleDirective } from '../ripple/_ripple.index';

@Component({
  selector:
    'button[ornstio-button],button[ornstio-flat-button],button[ornstio-stroked-button],button[ornstio-raised-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnstioButtonComponent implements OnInit {
  private _color: string;
  @Input() set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this.disabled ? 'disabled' : this._color ?? 'basic';
  }
  @Input() size: OrnstioSize = OrnstioSize.Large;

  @HostBinding('disabled') @Input() disabled: boolean;

  @HostBinding('class') get classes(): string {
    return [this.color, this.size].join(' ');
  }

  @HostListener('click', ['$event']) click(): void {
    this.elementRef.nativeElement.blur();
  }

  constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}
}
