import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRoutinePage } from './new-routine.page';

describe('NewRoutinePage', () => {
  let component: NewRoutinePage;
  let fixture: ComponentFixture<NewRoutinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoutinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRoutinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
