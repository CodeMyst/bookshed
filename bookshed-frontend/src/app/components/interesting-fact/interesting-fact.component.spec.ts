import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestingFactComponent } from './interesting-fact.component';

describe('InterestingFactComponent', () => {
  let component: InterestingFactComponent;
  let fixture: ComponentFixture<InterestingFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestingFactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestingFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
