import { Component, OnInit } from '@angular/core';
import { OrnstioSize } from 'components';

@Component({
  selector: 'app-size-example',
  templateUrl: './size-example.component.html',
  styleUrls: ['../../example.component.scss', './size-example.component.scss'],
})
export class SizeExampleComponent implements OnInit {
  readonly values = Object.keys(OrnstioSize).map((key) => ({
    name: key,
    description: OrnstioSize[key],
  }));

  constructor() {}

  ngOnInit(): void {}
}
