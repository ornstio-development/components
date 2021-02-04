import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { OrnstioCardContentComponent } from './card-content/card-content.component';
import { OrnstioCardFooterComponent } from './card-footer/card-footer.component';
import { OrnstioCardHeaderComponent } from './card-header/card-header.component';

@Component({
  selector: 'ornstio-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class OrnstioCardComponent implements OnInit {
  @Input() padding: string = '16px';

  @ContentChild(OrnstioCardContentComponent) set cardContent(
    value: OrnstioCardContentComponent
  ) {
    if (!value || !!value.padding) {
      return;
    }
    value.element.style.padding = this.padding;
  }

  @ContentChild(OrnstioCardFooterComponent) set cardFooter(
    value: OrnstioCardFooterComponent
  ) {
    if (!value || !!value.padding) {
      return;
    }
    value.element.style.padding = this.padding;
  }

  @ContentChild(OrnstioCardHeaderComponent) set cardHeader(
    value: OrnstioCardHeaderComponent
  ) {
    if (!value || !!value.padding) {
      return;
    }
    value.element.style.padding = this.padding;
  }

  constructor() {}

  ngOnInit(): void {}
}
