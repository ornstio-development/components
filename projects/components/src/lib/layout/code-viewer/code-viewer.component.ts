import { Component, Input, OnInit } from '@angular/core';
import { highlight, highlightAuto } from 'highlight.js';
import { OrnstioLang } from '../../enums/ornstio-lang.enum';
@Component({
  selector: 'ornstio-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
})
export class OrnstioCodeViewerComponent implements OnInit {
  private _code: string;
  formattedCode: string;

  get code(): string {
    return this._code;
  }

  @Input() set code(value: string) {
    this._code = value;
    if (this.lang && this.code) {
      this.formattedCode = highlight(this.lang, this.code).value;
    }
  }

  private _lang: OrnstioLang;
  @Input() set lang(value: OrnstioLang) {
    this._lang = value;
    if (this.lang && this.code) {
      this.formattedCode = highlight(this.lang, this.code).value;
    }
  }

  get lang(): OrnstioLang {
    return this._lang;
  }

  get classes(): string[] {
    return [`lang-${this.lang}`];
  }

  constructor() {}

  ngOnInit(): void {}
}
