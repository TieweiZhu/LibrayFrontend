import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmanagementComponent } from './pmanagement.component';

describe('PmanagementComponent', () => {
  let component: PmanagementComponent;
  let fixture: ComponentFixture<PmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
