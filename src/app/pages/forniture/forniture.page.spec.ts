import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForniturePage } from './forniture.page';

describe('ForniturePage', () => {
  let component: ForniturePage;
  let fixture: ComponentFixture<ForniturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForniturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForniturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
