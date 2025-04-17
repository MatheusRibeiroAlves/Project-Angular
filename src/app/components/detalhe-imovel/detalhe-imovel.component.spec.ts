import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheImovelComponent } from './detalhe-imovel.component';

describe('DetalheImovelComponent', () => {
  let component: DetalheImovelComponent;
  let fixture: ComponentFixture<DetalheImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
