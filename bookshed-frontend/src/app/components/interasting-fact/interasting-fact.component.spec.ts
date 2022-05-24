import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterastingFactComponent } from './interasting-fact.component';

describe('InterastingFactComponent', () => {
  let component: InterastingFactComponent;
  let fixture: ComponentFixture<InterastingFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterastingFactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterastingFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
