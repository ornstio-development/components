import { Component, Inject, OnInit } from '@angular/core';
import { OrnstioToastService, ORNSTIO_TOAST_DATA } from './toast.service';

@Component({
  selector: 'ornstio-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class OrnstioToastComponent implements OnInit {
  constructor(
    @Inject(ORNSTIO_TOAST_DATA) public value: string,
    public toastService: OrnstioToastService
  ) {}

  ngOnInit(): void {}
}
