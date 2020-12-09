import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorReqPage } from './doctor-req.page';

describe('DoctorReqPage', () => {
  let component: DoctorReqPage;
  let fixture: ComponentFixture<DoctorReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
