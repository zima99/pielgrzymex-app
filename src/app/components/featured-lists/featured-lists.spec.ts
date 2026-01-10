import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedLists } from './featured-lists';

describe('FeaturedLists', () => {
  let component: FeaturedLists;
  let fixture: ComponentFixture<FeaturedLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
