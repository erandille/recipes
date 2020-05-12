import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTabComponent } from './recipe-tab.component';

describe('RecipeTabComponent', () => {
  let component: RecipeTabComponent;
  let fixture: ComponentFixture<RecipeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
