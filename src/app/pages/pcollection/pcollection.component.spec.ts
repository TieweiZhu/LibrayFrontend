import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcollectionComponent } from './pcollection.component';

describe('PcollectionComponent', () => {
  let component: PcollectionComponent;
  let fixture: ComponentFixture<PcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
