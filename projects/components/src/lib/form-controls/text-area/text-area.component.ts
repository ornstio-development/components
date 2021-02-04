import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrnstioSize } from '../../enums/ornstio.size.enum';

@Component({
  selector: 'ornstio-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class OrnstioTextAreaComponent implements AfterViewInit, OnDestroy {
  private _value: string;
  private _error: boolean;
  private _color: string;
  private _focused: boolean = false;
  private _destroy$ = new Subject<void>();

  get focused(): boolean {
    return this._focused;
  }

  @ViewChild('textarea', { static: true })
  textareaElementRef: ElementRef<HTMLInputElement>;
  @Input() tabindex: number = 0;

  get classes(): string[] {
    return [
      this.size,
      this.color ?? '',
      this.error ? 'error' : '',
      this.resize ? 'resize' : 'no-resize',
    ].filter((_) => !!_);
  }

  get iconClasses(): string[] {
    return [
      this.size,
      this.color,
      this.error ? 'error' : '',
      this.focused ? 'focus' : '',
    ].filter((_) => !!_);
  }

  public get value(): string {
    return this._value;
  }

  @Input() public set value(value: string) {
    this._value = value;
    this.control?.patchValue(this._value);
    this.valueChange.next(this.value);
  }

  @Output() valueChange = new EventEmitter<string>();

  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() control: AbstractControl;
  @Input() size: OrnstioSize = OrnstioSize.Large;
  @Input() rows: number = 2;
  @Input() resize: boolean = true;

  @Input() placeholder: string = '';
  get color(): string {
    return this.disabled
      ? 'disabled'
      : this.error
      ? 'error'
      : this._focused
      ? this._color
      : 'basic';
  }
  @Input() set color(color: string) {
    this._color = color;
  }
  get error(): boolean {
    return this._error || this.control?.invalid;
  }
  @Input() set error(value: boolean) {
    this._error = value;
  }

  constructor() {}

  ngAfterViewInit(): void {
    fromEvent(this.textareaElementRef.nativeElement, 'focus')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => (this._focused = true));
    fromEvent(this.textareaElementRef.nativeElement, 'focusout')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => (this._focused = false));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
