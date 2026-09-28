import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoria } from './categoria';

describe('Categoria', () => {
  let component: Categoria;
  let fixture: ComponentFixture<Categoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Categoria],
    }).compileComponents();

    fixture = TestBed.createComponent(Categoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
