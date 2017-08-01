import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroPostComponent } from './tro-post.component';

describe('TroPostComponent', () => {
  let component: TroPostComponent;
  let fixture: ComponentFixture<TroPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
