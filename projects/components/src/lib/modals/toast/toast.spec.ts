import { Component, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OrnstioToastModule } from './toast.module';
import { OrnstioToastService, ORNSTIO_TOAST_DATA } from './toast.service';

@Component({ template: '<div></div>' })
class OrnstioToastTestComponent {
  constructor(@Inject(ORNSTIO_TOAST_DATA) public data: string) {}
}

describe('Toast', () => {
  let service: OrnstioToastService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OrnstioToastTestComponent],
      imports: [OrnstioToastModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(OrnstioToastService);
  });

  it('should open and close', (done) => {
    spyOn(service, 'close').and.callThrough();
    service.open('Hello World', { duration: 250 });
    setTimeout(() => {
      expect(service.close).toHaveBeenCalled();
      done();
    }, 300);
  });

  it('should open with component', () => {
    service.open(OrnstioToastTestComponent, { data: 'Hello World' });
    expect(service.componentRef<OrnstioToastTestComponent>().data).toEqual(
      'Hello World'
    );
    service.close();
  });

  it('should open without config', () => {
    expect(() => service.open('Hello World')).not.toThrow();
    service.close();
  });
});
