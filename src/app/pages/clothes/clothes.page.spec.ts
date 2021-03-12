import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClothesPage } from './clothes.page';

describe('ClothesPage', () => {
  let component: ClothesPage;
  let fixture: ComponentFixture<ClothesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClothesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
