import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPortfolioComponent } from './edit-portfolio.component';

describe('EditPortfolioComponent', () => {
  let component: EditPortfolioComponent;
  let fixture: ComponentFixture<EditPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
