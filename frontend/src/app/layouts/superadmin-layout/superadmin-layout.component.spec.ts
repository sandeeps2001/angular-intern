import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminLayoutComponent } from './superadmin-layout.component';

describe('SuperadminLayoutComponent', () => {
  let component: SuperadminLayoutComponent;
  let fixture: ComponentFixture<SuperadminLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperadminLayoutComponent]
    });
    fixture = TestBed.createComponent(SuperadminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
