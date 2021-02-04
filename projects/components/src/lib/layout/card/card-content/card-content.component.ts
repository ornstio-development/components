import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ornstio-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
})
export class OrnstioCardContentComponent implements OnInit {
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
