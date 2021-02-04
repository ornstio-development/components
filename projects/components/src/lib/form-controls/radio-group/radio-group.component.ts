import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ornstio-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */ () => OrnstioRadioGroupComponent
      ),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnstioRadioGroupComponent implements OnInit {
  private _value: any;
  @Input() set value(value: any) {
    this._value = value;
    this.control?.patchValue(this.value);
  }
  get value(): any {
    return this._value;
  }
  @Output() valueChange = new EventEmitter<any>();

  private _color: string;
  @Input() set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this._color ?? 'basic';
  }
  @Input() control: AbstractControl;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit(): void {}
}
