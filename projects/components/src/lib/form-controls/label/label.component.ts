import {
  Component,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';

import { OrnstioFormFieldComponent } from '../form-field/_form-field.index';

@Component({
  selector: 'ornstio-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class OrnstioLabelComponent implements OnInit {
  private _color: string;

  get classes(): string[] {
    return [this.color].filter((_) => !!_);
  }

  get color(): string {
    return this.formField?.color ?? this._color ?? 'basic';
  }
  @Input() set color(color: string) {
    this._color = color;
  }

  constructor(
    @Optional()
    @Inject(forwardRef(() => OrnstioFormFieldComponent))
    public readonly formField?: OrnstioFormFieldComponent
  ) {}

  ngOnInit(): void {}
}
