import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInterface } from './vendor-interface';

describe('VendorInterface', () => {
  let component: VendorInterface;
  let fixture: ComponentFixture<VendorInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorInterface]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorInterface);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
