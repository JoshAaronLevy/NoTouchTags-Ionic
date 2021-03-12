import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MosaicPage } from './mosaic.page';

describe('MosaicPage', () => {
  let component: MosaicPage;
  let fixture: ComponentFixture<MosaicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MosaicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MosaicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
