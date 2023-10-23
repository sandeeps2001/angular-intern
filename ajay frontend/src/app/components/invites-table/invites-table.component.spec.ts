import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesTableComponent } from './invites-table.component';

describe('InvitesTableComponent', () => {
  let component: InvitesTableComponent;
  let fixture: ComponentFixture<InvitesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
