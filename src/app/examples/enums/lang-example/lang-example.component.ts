import { Component, OnInit } from '@angular/core';
import { OrnstioLang } from 'components';

@Component({
  selector: 'app-lang-example',
  templateUrl: './lang-example.component.html',
  styleUrls: ['../../example.component.scss', './lang-example.component.scss'],
})
export class LangExampleComponent implements OnInit {
  readonly values = Object.keys(OrnstioLang).map((key) => ({
    name: key,
    description: OrnstioLang[key],
  }));

  constructor() {}

  ngOnInit(): void {}
}
