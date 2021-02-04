import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { OrnstioDialogService, ORNSTIO_DIALOG_DATA } from 'components';
import { ExampleComponent } from '../../example.component';

@Component({
  selector: 'app-dialog-content',
  template: ` <ornstio-card>
    <ornstio-card-header>
      <h1>Dialog</h1>
      <button
        ornstio-button
        ornstioRipple
        size="large"
        (click)="dialogService.close()"
      >
        <i class="material-icons">close</i>
      </button>
    </ornstio-card-header>
    <ornstio-card-content>{{ data }}</ornstio-card-content>
    <ornstio-card-footer>
      <button ornstio-button color="warn" (click)="dialogService.close(false)">
        Cancel
      </button>
      <button
        ornstio-raised-button
        color="primary"
        (click)="dialogService.close(true)"
      >
        OK
      </button>
    </ornstio-card-footer>
  </ornstio-card>`,
  styleUrls: [
    '../../example.component.scss',
    './dialog-example.component.scss',
  ],
  styles: [
    ':host{padding: 0;width:100%; height: 100%;}',
    'ornstio-card{width:100%; height: 100%; display: flex; flex-direction: column; margin: 0}',
    'ornstio-card-content{flex:1}',
    'ornstio-card-footer{ text-align:right}',
    'button{ margin-left: 16px;}',
  ],
})
export class DialogContentComponent {
  constructor(
    @Inject(ORNSTIO_DIALOG_DATA) public data: string,
    public dialogService: OrnstioDialogService
  ) {}
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: [
    '../../example.component.scss',
    './dialog-example.component.scss',
  ],
})
export class DialogExampleComponent extends ExampleComponent implements OnInit {
  apis = [
    {
      name:
        'open&lt;T,U&gt;(component: ComponentType&lt;T&gt;, config: OrnstioDialogConfig): Observable&lt;U&gt;',
      description: 'Opens a dialog with the passed component and configuration',
    },
    {
      name: 'close&lt;U&gt;(value?: U): void',
      description: 'Closes the active dialog and emits the provided value',
    },
  ];

  configApis = [
    {
      name: 'data: T',
      description: 'Injected into component via @Inject(ORNSTIO_DIALOG_DATA)',
    },
    {
      name: 'height: string',
      description: 'Sets the height of the dialog container',
    },
    {
      name: 'width: string',
      description: 'Sets the width of the dialog container',
    },
    {
      name: 'closable: boolean',
      description:
        'Determines whether clicking outside of the dialog will close it',
    },
    {
      name: 'panelClass: string[]',
      description: 'Applies classes to dialog container',
    },
    {
      name: 'top: string',
      description: 'Sets the top position of the dialog container',
    },
    {
      name: 'bottom: string',
      description: 'Sets the bottom position of the dialog container',
    },
    {
      name: 'left: string',
      description: 'Sets the left position of the dialog container',
    },
    {
      name: 'right: string',
      description: 'Sets the right position of the dialog container',
    },
  ];

  height = '25%';
  width = '25%';
  data = 'Hello world!';
  closable = true;
  left: string;
  top: string;
  right: string;
  bottom: string;
  constructor(
    httpClient: HttpClient,
    private dialogService: OrnstioDialogService
  ) {
    super(httpClient);
  }

  ngOnInit(): void {}

  open(): void {
    this.dialogService.open(DialogContentComponent, {
      data: this.data,
      closable: this.closable,
      width: this.width,
      height: this.height,
      top: this.top,
      bottom: this.bottom,
      right: this.right,
      left: this.left,
    });
  }
}
