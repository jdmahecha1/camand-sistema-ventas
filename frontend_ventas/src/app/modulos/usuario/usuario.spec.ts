import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usuario } from './usuario';

describe('Usuario', () => {
  let component: Usuario;
  let fixture: ComponentFixture<Usuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Usuario],
    }).compileComponents();

    fixture = TestBed.createComponent(Usuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
