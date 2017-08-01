import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroFooterComponent } from './tro-footer.component';

describe('TroFooterComponent', () => {
  let component: TroFooterComponent;
  let fixture: ComponentFixture<TroFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
