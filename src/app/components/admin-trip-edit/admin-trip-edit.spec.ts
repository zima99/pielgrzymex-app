import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTripEdit } from './admin-trip-edit';

describe('AdminTripEdit', () => {
  let component: AdminTripEdit;
  let fixture: ComponentFixture<AdminTripEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTripEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTripEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
