import {
  Component,
  ContentChild,
  ContentChildren,
  forwardRef,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { OrnstioInputComponent } from '../input/_input.index';
import { OrnstioSelectComponent } from '../select/_select.index';
import { OrnstioTextAreaComponent } from '../text-area/_text-area.index';
@Component({
  selector: 'ornstio-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,

      useExisting: forwardRef(
        /* istanbul ignore next */ () => OrnstioFormFieldComponent
      ),
      multi: true,
    },
  ],
})
export class OrnstioFormFieldComponent implements OnInit {
  @ContentChild(OrnstioInputComponent) inputComponent: OrnstioInputComponent;
  @ContentChild(OrnstioSelectComponent) selectComponent: OrnstioSelectComponent;
  @ContentChild(OrnstioTextAreaComponent)
  textAreaComponent: OrnstioTextAreaComponent;

  get color(): string {
    return (
      this.inputComponent?.color ??
      this.selectComponent?.color ??
      this.textAreaComponent?.color ??
      'basic'
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
