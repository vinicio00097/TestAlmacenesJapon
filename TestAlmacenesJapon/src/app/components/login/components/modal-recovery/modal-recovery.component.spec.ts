import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecoveryComponent } from './modal-recovery.component';

describe('ModalRecoveryComponent', () => {
  let component: ModalRecoveryComponent;
  let fixture: ComponentFixture<ModalRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
