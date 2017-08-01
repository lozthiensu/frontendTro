import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroItemComponent } from './tro-item.component';

describe('TroItemComponent', () => {
  let component: TroItemComponent;
  let fixture: ComponentFixture<TroItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
