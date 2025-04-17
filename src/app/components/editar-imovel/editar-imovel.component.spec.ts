import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarImovelComponent } from './editar-imovel.component';

describe('EditarImovelComponent', () => {
  let component: EditarImovelComponent;
  let fixture: ComponentFixture<EditarImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
