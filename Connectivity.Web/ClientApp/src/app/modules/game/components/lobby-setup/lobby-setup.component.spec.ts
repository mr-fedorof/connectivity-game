import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbySetupComponent } from './lobby-setup.component';

describe('LobbySetupComponent', () => {
  let component: LobbySetupComponent;
  let fixture: ComponentFixture<LobbySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
