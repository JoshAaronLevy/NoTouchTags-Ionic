import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeroPage } from './hero.page';

describe('HeroPage', () => {
  let component: HeroPage;
  let fixture: ComponentFixture<HeroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
