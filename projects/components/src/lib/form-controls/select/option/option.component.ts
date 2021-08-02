import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { OrnstioSelectComponent } from '../select.component';

@Component({
  selector: 'ornstio-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OrnstioOptionComponent implements OnInit, AfterViewChecked {
  private _hidden: boolean = false;
  @Input() value: any;
  @HostBinding('class.active') get active(): boolean {
    return this.selectComponent.option === this;
  }

  @HostBinding('class') get classes(): string {
    return [this.selectComponent.color ? this.selectComponent.color : 'basic']
      .filter((_) => !!_)
      .join(' ');
  }

  @HostListener('click', ['$event'])
  public select(event: UIEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.selectComponent.value = this.value;
    this.selectComponent.close();
    this.selectComponent.inputComponent.inputElementRef.nativeElement.focus();
  }

  get hidden(): boolean {
    return this._hidden;
  }
  @Input() set hidden(value: boolean) {
    this._hidden = value;
    this.element.style.display = value ? 'none' : 'block';
  }

  get text(): string {
    return this.element.textContent?.trim() ?? '';
  }

  get element(): HTMLElement {
    return this.ref.nativeElement;
  }

  constructor(
    private ref: ElementRef<HTMLElement>,
    private selectComponent: OrnstioSelectComponent,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {}
}
