import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddModalPage } from './add-modal.page';

describe('AddModalPage', () => {
  let component: AddModalPage;
  let fixture: ComponentFixture<AddModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
