import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsDashComponent } from './channels-dash.component';

describe('ChannelsDashComponent', () => {
  let component: ChannelsDashComponent;
  let fixture: ComponentFixture<ChannelsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
