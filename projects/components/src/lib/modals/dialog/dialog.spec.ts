import { Component } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { OrnstioDialogModule } from './dialog.module';
import { OrnstioDialogService } from './dialog.service';

@Component({
  selector: 'ornstio-dialog-test',
  template: '<div></div>',
})
class OrnstioDialogTestComponent {}

describe('Dialog', () => {
  let service: OrnstioDialogService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OrnstioDialogTestComponent],
      imports: [OrnstioDialogModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(OrnstioDialogService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should open and close', (done) => {
    const data = 10;
    service
      .open(OrnstioDialogTestComponent, { data: {}, closable: true })
      .subscribe((value: number) => {
        expect(data).toEqual(value);
        done();
      });
    service.close(data);
  });

  it('should open and close with click', (done) => {
    service
      .open(OrnstioDialogTestComponent, { data: {}, closable: true })
      .subscribe((value) => {
        expect(value).toBeFalsy();
        done();
      });
    (document.getElementsByClassName(
      'cdk-overlay-backdrop'
    )[0] as HTMLElement).click();
  });

  it('should open without config', () => {
    expect(() => service.open(OrnstioDialogTestComponent)).not.toThrow();
    service.close();
  });
});
