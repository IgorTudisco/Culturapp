import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEventoComponent } from './criar-evento.component';

describe('CriarEventoComponent', () => {
  let component: CriarEventoComponent;
  let fixture: ComponentFixture<CriarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
