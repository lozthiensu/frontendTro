import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroDetailComponent } from './tro-detail.component';

describe('TroDetailComponent', () => {
  let component: TroDetailComponent;
  let fixture: ComponentFixture<TroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
