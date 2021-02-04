import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { OrnstioSize } from '../../enums/ornstio.size.enum';

@Component({
  selector: 'ornstio-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class OrnstioSwitchComponent {
  @ViewChild('input', { static: true })
  inputElementRef: ElementRef<HTMLInputElement>;

  get classes(): string[] {
    return [
      this.size,
      this.color ?? '',
      this.inputElementRef.nativeElement.checked ? 'checked' : 'unchecked',
      this._noAnimation ? 'no-animation' : '',
    ].filter((_) => !!_);
  }
  @Input() tabindex: number = 0;
  @Input() size: OrnstioSize = OrnstioSize.Large;
  @Input() control: AbstractControl;
  @Input() disabled: boolean;

  private _value: boolean = false;
  @Input() set value(value: boolean) {
    if (this._init) {
      this._noAnimation = false;
    }
    this._value = value;
    this.control?.patchValue(this.value);
    this._init = true;
  }
  get value(): boolean {
    return this._value;
  }

  private _init: boolean = false;
  private _noAnimation: boolean = true;

  private _color: string;
  get color(): string {
    return this.disabled
      ? 'disabled'
      : this.inputElementRef.nativeElement.checked
      ? this._color
      : 'basic';
  }
  @Input() set color(color: string) {
    this._color = color;
  }

  @Output() valueChange = new EventEmitter<boolean>();

  @HostListener('click') click(): void {
    if (this.disabled) {
      return;
    }
    this.inputElementRef.nativeElement.click();
  }

  @HostBinding('class.disabled') get disabledClass(): boolean {
    return this.disabled;
  }

  constructor() {}
}
