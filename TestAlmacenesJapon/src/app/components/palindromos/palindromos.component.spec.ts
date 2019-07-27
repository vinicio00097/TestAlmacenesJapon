import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalindromosComponent } from './palindromos.component';

describe('PalindromosComponent', () => {
  let component: PalindromosComponent;
  let fixture: ComponentFixture<PalindromosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalindromosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalindromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
