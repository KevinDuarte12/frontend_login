import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdDelUserComponent } from './upd-del-user.component';

describe('UpdDelUserComponent', () => {
  let component: UpdDelUserComponent;
  let fixture: ComponentFixture<UpdDelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdDelUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdDelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
