import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ExampleComponent } from '../../example.component';
import { OrnstioToastService, ORNSTIO_TOAST_DATA } from 'components';

@Component({
  selector: 'app-toast-content',
  template:
    '<span>{{data}}<span><button ornstio-button (click)="toastService.close()"><i class="material-icons">close</i></button>',
  styles: [
    `
      :host {
        padding: 8px 16px;
        background: #191919;
        color: white;
      }
    `,
    `
      button[ornstio-button] {
        color: white;
        background: transparent;
        margin-left: 8px;
      }
    `,
  ],
})
export class ToastContentComponent {
  constructor(
    @Inject(ORNSTIO_TOAST_DATA) public data: string,
    @Inject(OrnstioToastService) public toastService: OrnstioToastService
  ) {}
}

@Component({
  selector: 'app-toast-example',
  templateUrl: './toast-example.component.html',
  styleUrls: ['../../example.component.scss', './toast-example.component.scss'],
})
export class ToastExampleComponent extends ExampleComponent implements OnInit {
  apis = [
    {
      name:
        'open&lt;T&gt;(value: string | ComponentType&lt;T&gt;, config: OrnstioToastConfig): Observable&lt;void&gt;',
      description:
        'Opens a toast with the passed component/string and configuration. If value is string, then the default OrnstioToastComponent will be used',
    },
    {
      name: 'close(): void',
      description: 'Closes the active toast and emits the provided value',
    },
  ];

  configApis = [
    {
      name: 'data: T',
      description:
        'Injected into component via @Inject(ORNSTIO_TOAST_DATA). If value of open() is string, this will be populated with provided string value',
    },
    {
      name: 'panelClass: string[]',
      description: 'Applies classes to toast container',
    },
    {
      name: 'top: string',
      description: 'Sets the top position of the toast container',
    },
    {
      name: 'bottom: string',
      description: 'Sets the bottom position of the toast container',
    },
    {
      name: 'left: string',
      description: 'Sets the left position of the toast container',
    },
    {
      name: 'right: string',
      description: 'Sets the right position of the toast container',
    },
    {
      name: 'duration: number',
      description: 'Sets the duration in milliseconds of the toast',
    },
  ];
  duration: number;
  top: string;
  left: string;
  right: string;
  bottom: string;
  value: string = 'Hello World!';
  useCustomComponent: boolean;

  constructor(
    httpClient: HttpClient,
    private toastService: OrnstioToastService
  ) {
    super(httpClient);
  }

  ngOnInit(): void {}

  open(): void {
    this.toastService.open(
      this.useCustomComponent ? ToastContentComponent : this.value,
      {
        data: this.value,
        duration: this.duration,
        top: this.top,
        bottom: this.bottom,
        right: this.right,
        left: this.left,
      }
    );
  }
}
