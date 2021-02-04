import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioPaginatorComponent } from './paginator.component';
import { OrnstioPaginatorModule } from './paginator.module';

describe('Paginator', () => {
  let component: OrnstioPaginatorComponent;
  let fixture: ComponentFixture<OrnstioPaginatorComponent>;
  const pageSizes = [5, 10, 50, 100];
  const length = 100;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrnstioPaginatorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioPaginatorComponent);
    component = fixture.componentInstance;
    component.length = length;
    component.pageSizes = pageSizes;
    fixture.detectChanges();
  });

  it('should change page size', () => {
    spyOn(component.pageSizeChange, 'next');
    component.pageSize = pageSizes.last();
    expect(component.pageSize).toEqual(pageSizes.last());
    expect(component.pageIndex).toEqual(0);
    expect(component.pageSizeChange.next).toHaveBeenCalled();
  });

  it('should reset page index if page size is too large', () => {
    component.lastPage();
    component.pageSize = pageSizes.last();
    expect(component.pageIndex).toEqual(0);
  });

  it('next page should not equal pageIndex', () => {
    component.firstPage();
    expect(component.nextPage).not.toEqual(component.pageIndex);
  });

  it('next page should equal pageIndex', () => {
    component.lastPage();
    expect(component.nextPage).toEqual(component.pageIndex);
  });

  it('previous page should not equal pageIndex', () => {
    component.firstPage();
    expect(component.previousPage).toEqual(component.pageIndex);
  });

  it('previous page should equal pageIndex', () => {
    component.lastPage();
    expect(component.previousPage).not.toEqual(component.pageIndex);
  });

  it('should go to first page', () => {
    component.lastPage();
    component.firstPage();
    expect(component.pageIndex).toEqual(0);
  });

  it('should reset paginator when page sizes change', () => {
    component.pageIndex = component.nextPage;
    component.pageSize = pageSizes.last();
    component.pageSizes = [...pageSizes];
    expect(component.pageIndex).toEqual(0);
    expect(component.pageSize).toEqual(pageSizes.first());
  });

  it('should get next page', () => {
    expect(component.nextPage).toEqual(component.pageIndex + 1);
  });

  it('should set page size', () => {
    expect(component.pageSizes).toEqual(pageSizes);
  });
});
