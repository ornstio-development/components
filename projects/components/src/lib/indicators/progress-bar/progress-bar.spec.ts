import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioProgressBarComponent } from './progress-bar.component';
import { OrnstioProgressBarModule } from './progress-bar.module';

describe('Progress Bar', () => {
  let component: OrnstioProgressBarComponent;
  let fixture: ComponentFixture<OrnstioProgressBarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [OrnstioProgressBarModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set progress', () => {
    component.progress = 50;
    expect(component.progress).toEqual(50);
  });

  it('should set progress to 100 if value is greater than 100', () => {
    component.progress = 110;
    expect(component.progress).toEqual(100);
  });

  it('should set progress to 0 if value is less than 0', () => {
    component.progress = -10;
    expect(component.progress).toEqual(0);
  });

  it('should set transform', () => {
    component.progress = 40;
    expect(component.progressBar.nativeElement.style.transform).toEqual(
      `translateX(-60%)`
    );
  });
});
