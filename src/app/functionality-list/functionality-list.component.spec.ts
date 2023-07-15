import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityListComponent } from './functionality-list.component';

describe('FunctionalityListComponent', () => {
  let component: FunctionalityListComponent;
  let fixture: ComponentFixture<FunctionalityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
