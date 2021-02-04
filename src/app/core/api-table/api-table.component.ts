import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.scss'],
})
export class ApiTableComponent implements OnInit {
  @Input() apis: { name: string; description: string }[];

  constructor() {}

  ngOnInit(): void {}
}
