import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EditarImovelComponent } from './editar-imovel.component';
import { ImovelService } from '../../services/imovel.service';
import { ImovelResponse, ImovelCreate } from '../../models/imovel.model';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('EditarImovelComponent', () => {
  let component: EditarImovelComponent;
  let fixture: ComponentFixture<EditarImovelComponent>;
  let imovelServiceSpy: jasmine.SpyObj<ImovelService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const mockImovelResponse: ImovelResponse = { id: '1', titulo: 'Teste', cidade: 'Teste', estado: 'TS', valor: 100, imagens: [] };

  beforeEach(async () => {
    imovelServiceSpy = jasmine.createSpyObj('ImovelService', ['getImovel', 'updateImovel']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditarImovelComponent, RouterTestingModule, FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
        { provide: ImovelService, useValue: imovelServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should try to load the imovel details for editing', () => {
    imovelServiceSpy.getImovel.and.returnValue(of(mockImovelResponse));
    component.ngOnInit();
    expect(imovelServiceSpy.getImovel).toHaveBeenCalledWith('1');
    expect(component.imovel).toEqual(mockImovelResponse);
  });

  it('should call the service to update the imovel when saving', () => {
    component.imovel = { titulo: 'Novo Título', cidade: 'Nova Cidade', estado: 'NC', valor: 200, imagens: [] };
    imovelServiceSpy.updateImovel.and.returnValue(of({ id: '1', ...component.imovel }));
    component.imovelId = '1';
    component.salvarEdicao();
    expect(imovelServiceSpy.updateImovel).toHaveBeenCalledWith('1', { ...component.imovel, imagens: [] });
  });

  it('should go to the imovel details page after saving', () => {
    component.imovel = { titulo: 'Novo Título', cidade: 'Nova Cidade', estado: 'NC', valor: 200, imagens: [] };
    imovelServiceSpy.updateImovel.and.returnValue(of({ id: '1', ...component.imovel }));
    component.imovelId = '1';
    component.salvarEdicao();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/imovel', '1']);
  });

  it('should show an error message if loading the imovel fails', () => {
    const errorMessage = 'Erro ao carregar.';
    imovelServiceSpy.getImovel.and.returnValue(throwError(() => errorMessage));
    component.ngOnInit();
    expect(component.errorMessage).toContain('Erro ao carregar imóvel para edição.');
  });

  it('should show an error message if saving the imovel fails', () => {
    const errorMessage = 'Erro ao salvar.';
    imovelServiceSpy.updateImovel.and.returnValue(throwError(() => errorMessage));
    component.imovel = { titulo: 'Novo Título', cidade: 'Nova Cidade', estado: 'NC', valor: 200, imagens: [] };
    component.imovelId = '1';
    component.salvarEdicao();
    expect(component.errorMessage).toContain('Erro ao salvar as alterações do imóvel.');
  });
});