import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeevComponent } from './listeev.component';

describe('ListeevComponent', () => {
  let component: ListeevComponent;
  let fixture: ComponentFixture<ListeevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
