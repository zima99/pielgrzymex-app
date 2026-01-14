import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAdd } from './admin-user-add';

describe('AdminUserAdd', () => {
  let component: AdminUserAdd;
  let fixture: ComponentFixture<AdminUserAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
