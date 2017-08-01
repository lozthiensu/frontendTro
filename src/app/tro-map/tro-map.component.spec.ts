import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroMapComponent } from './tro-map.component';

describe('TroMapComponent', () => {
  let component: TroMapComponent;
  let fixture: ComponentFixture<TroMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
