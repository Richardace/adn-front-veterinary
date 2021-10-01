import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsarioHomeComponent } from './usario-home.component';

describe('UsarioHomeComponent', () => {
  let component: UsarioHomeComponent;
  let fixture: ComponentFixture<UsarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsarioHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
