import { componentFactoryName } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { OrnstioFormFieldModule } from '../../form-controls/form-field/form-field.module';
import { OrnstioTableComponent } from './table.component';
import { OrnstioTableModule } from './table.module';

@Component({
  template: `<table ornstio-table [dataSource]="data">
    <td
      *ornstioColumn="
        let element;
        name: 'id';
        property: 'id';
        filter: filter;
        sort: sort
      "
    >
      {{ element.id }}
    </td>
    <td
      *ornstioColumn="
        let element;
        name: 'name';
        property: 'name';
        filter: true;
        sort: true;
        resize: true
      "
    >
      {{ element.name }}
    </td>
    <td *ornstioColumn="let element"></td>
  </table>`,
})
class OrnstioTableTestComponent {
  @ViewChild(OrnstioTableComponent) component: OrnstioTableComponent<any>;
  data = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
  ];
  filter = (
    a: { id: number; name: string },
    value: string,
    property?: string
  ): boolean => {
    return a[property] === +value;
  };

  sort = (
    a: { id: number; name: string },
    b: { id: number; name: string },
    property?: string
  ) => {
    return a[property] > b[property] ? -1 : 1;
  };
}

describe('Table', () => {
  let component: OrnstioTableComponent<any>;
  let fixture: ComponentFixture<OrnstioTableTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OrnstioTableTestComponent],
      imports: [OrnstioTableModule, OrnstioFormFieldModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioTableTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.component;
    fixture.detectChanges();
  });

  it('should filter', fakeAsync(() => {
    component.displayColumns[0].setFilter('1');
    tick(500);
    fixture.detectChanges();
    expect(component.filteredData.length).toEqual(1);
    component.displayColumns[1].setFilter('2');
    tick(500);
    fixture.detectChanges();
    expect(component.filteredData.length).toEqual(0);
  }));

  it('should sort', fakeAsync(() => {
    component.sortColumn = component.displayColumns[0];
    expect(component.filteredData).toEqual([...component.data].reverse());
    component.sortColumn = component.displayColumns[0];
    expect(component.filteredData).toEqual(component.data);
    component.sortColumn = component.displayColumns[1];
    expect(component.filteredData).toEqual(component.data);
    component.sortColumn = component.displayColumns[1];
    expect(component.filteredData).toEqual([...component.data].reverse());
    component.sortColumn = component.displayColumns[1];
    expect(component.filteredData).toEqual(component.data);
  }));

  it('should not sort', () => {
    expect(() => (component.sortColumn = null)).not.toThrow();
    component.sortColumn = component.displayColumns[2];
    expect(component.sortColumn).toBeFalsy();
  });

  it('should populate data', fakeAsync(() => {
    tick(100);
    expect(component.displayRows.length).toBe(2);
  }));
});
