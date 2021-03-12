import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagDetailsPage } from './tag-details';

describe('TagDetailsPage', () => {
  let component: TagDetailsPage;
  let fixture: ComponentFixture<TagDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagDetailsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
