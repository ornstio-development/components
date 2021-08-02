import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { OrnstioRadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'ornstio-radio-option',
  templateUrl: './radio-option.component.html',
  styleUrls: ['./radio-option.component.scss'],
})
export class OrnstioRadioOptionComponent implements OnInit {
  get color(): string {
    return this.radioGroup.color;
  }

  get active(): boolean {
    return this.radioGroup.value === this.value;
  }

  private _disabled: boolean;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled(): boolean {
    return this.radioGroup.disabled ?? this._disabled;
  }

  @Input() value: any;
  @HostListener('click') click(): void {
    if (this.disabled) {
      return;
    }
    this.radioGroup.valueChange.next((this.radioGroup.value = this.value));
  }

  @HostBinding('class') get classes(): string {
    return [
      this.color,
      this.active ? 'active' : null,
      this.disabled ? 'disabled' : null,
    ]
      .filter((_) => !!_)
      .join(' ');
  }

  constructor(
    @Inject(forwardRef(() => OrnstioRadioGroupComponent))
    public readonly radioGroup: OrnstioRadioGroupComponent
  ) {}

  ngOnInit(): void {}
}
