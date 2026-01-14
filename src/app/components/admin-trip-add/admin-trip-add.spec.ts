import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTripAdd } from './admin-trip-add';

describe('AdminTripAdd', () => {
  let component: AdminTripAdd;
  let fixture: ComponentFixture<AdminTripAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTripAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTripAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
