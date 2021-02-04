import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-paginator-example',
  templateUrl: './paginator-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './paginator-example.component.scss',
  ],
})
export class PaginatorExampleComponent
  extends ExampleComponent
  implements OnInit {
  apis = [
    {
      name: '@Input() length: number',
      description: 'Length of array being paginated',
    },
    {
      name: '@Input() pageSizes: number[]',
      description: 'Allowed page size selections',
    },
    {
      name: '@Input() pageSize: number',
      description: 'Sets the active page size selection',
    },
    {
      name: '@Output() pageSizeChange: number',
      description: 'Emits when page size has changed',
    },
    {
      name: '@Output() pageIndexChange: number',
      description: 'Emits when the page changes',
    },
  ];
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit(): void {}
}
