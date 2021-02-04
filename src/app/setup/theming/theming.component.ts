import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styleUrls: [
    '../../examples/example.component.scss',
    './theming.component.scss',
  ],
})
export class ThemingComponent implements OnInit {
  scss: string = `@import "~@ornstio/components/assets/_theme";

$theme: (
  "primary": #540fe8,
  "secondary": #976dda,
  "warn": #ee6352,
);

@include ornstio-theme($theme, #ee6352, "Works Sans");
`;

  html: string = `<button ornstioRipple ornstio-raised-button color="primary">Primary</button>
<button ornstioRipple ornstio-raised-button color="secondary">Seconday</button>
<button ornstioRipple ornstio-raised-button color="warn">Warn</button>`;

  constructor() {}

  ngOnInit(): void {}
}
