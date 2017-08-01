import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroHeaderComponent } from './tro-header.component';

describe('TroHeaderComponent', () => {
  let component: TroHeaderComponent;
  let fixture: ComponentFixture<TroHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
