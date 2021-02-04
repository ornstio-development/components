import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  selector: 'ornstio-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnstioCheckboxComponent {
  @ViewChild('input', { static: true })
  inputElementRef: ElementRef<HTMLInputElement>;

  get classes(): string[] {
    return [
      this.size,
      this.color ?? '',
      this.inputElementRef.nativeElement.checked ? 'checked' : '',
    ].filter((_) => !!_);
  }
  @Input() tabindex: number = 0;
  @Input() size: OrnstioSize = OrnstioSize.Large;
  @Input() control: AbstractControl;
  @Input() disabled: boolean;

  private _value: boolean = false;
  @Input() set value(value: boolean) {
    this._value = value;
    this.control?.patchValue(this.value);
  }
  get value(): boolean {
    return this._value;
  }

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
    this.cdr.detectChanges();
  }

  @HostBinding('class.disabled') get disabledClass(): boolean {
    return this.disabled;
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
