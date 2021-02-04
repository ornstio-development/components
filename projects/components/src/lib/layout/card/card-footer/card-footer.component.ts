import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ornstio-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
})
export class OrnstioCardFooterComponent implements OnInit {
  private _padding: string;
  get padding(): string {
    return this._padding;
  }
  @Input() set padding(value: string) {
    this._padding = value;
    this.element.style.padding = value;
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}
}
