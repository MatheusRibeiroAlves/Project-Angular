import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DetalheImovelComponent } from './detalhe-imovel.component';
import { ImovelService } from '../../services/imovel.service';
import { ImovelResponse } from '../../models/imovel.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetalheImovelComponent', () => {
  let component: DetalheImovelComponent;
  let fixture: ComponentFixture<DetalheImovelComponent>;
  let imovelServiceSpy: jasmine.SpyObj<ImovelService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const mockImovel: ImovelResponse = { id: '1', titulo: 'Teste', cidade: 'Teste', estado: 'TS', valor: 100 };

  beforeEach(async () => {
    imovelServiceSpy = jasmine.createSpyObj('ImovelService', ['getImovel', 'deleteImovel']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DetalheImovelComponent, RouterTestingModule],
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

    fixture = TestBed.createComponent(DetalheImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('verifica se o componente foi criado', () => {
    expect(component).toBeTruthy();
  });

  it('verificando se a pagina de detalhes é exibida ao carregar a pagina', () => {
    imovelServiceSpy.getImovel.and.returnValue(of(mockImovel));
    component.ngOnInit();
    expect(imovelServiceSpy.getImovel).toHaveBeenCalledWith('1');
    expect(component.imovel).toEqual(mockImovel);
  });

  it('verificando se ao delatar o imovel é redirecionado para a home', () => {
    component.imovel = mockImovel;
    imovelServiceSpy.deleteImovel.and.returnValue(of({ id: '1', titulo: '', cidade: '', estado: '', valor: 0 }));
    component.deletarImovel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('verificando se mostra a mesagem de erro caso a pagina de detalhes não carregar', () => {
    const errorMessage = 'Erro ao carregar.';
    imovelServiceSpy.getImovel.and.returnValue(throwError(() => errorMessage));
    component.ngOnInit();
    expect(component.errorMessage).toContain('Erro ao carregar detalhes do imóvel.');
    expect(component.imovel).toBeUndefined();
  });
});