import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ImovelService } from '../../services/imovel.service';
import { of, throwError } from 'rxjs';
import { ImovelResponse } from '../../models/imovel.model';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let componente: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let servicoImovelFalso: jasmine.SpyObj<ImovelService>;

  beforeEach(async () => {
    const criadorDeServicoFalso = jasmine.createSpyObj('ImovelService', ['getImoveis']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule, RouterModule],
      providers: [
        { provide: ImovelService, useValue: criadorDeServicoFalso },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
            },
            queryParams: of({}),
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    componente = fixture.componentInstance;
    servicoImovelFalso = TestBed.inject(ImovelService) as jasmine.SpyObj<ImovelService>;
  });

  it('Verificando se o componente foi criado', () => {
    expect(componente).toBeTruthy();
  });

  it('Verificando se ao abrir a página, pede os imóveis para o serviço', () => {
    spyOn(componente, 'carregarImoveis');
    servicoImovelFalso.getImoveis.and.returnValue(of([]));
    fixture.detectChanges();
    componente.ngOnInit();
    expect(componente.carregarImoveis).toHaveBeenCalled();
  });

  it('Verificando se os imóveis são mostrados quando o serviço dá certo', () => {
    const listaDeImoveis: ImovelResponse[] = [
      { id: '1', titulo: 'Casa Legal', cidade: 'São Paulo', estado: 'SP', valor: 150000 },
      { id: '2', titulo: 'Apê Confortável', cidade: 'Rio de Janeiro', estado: 'RJ', valor: 280000 },
    ];
    servicoImovelFalso.getImoveis.and.returnValue(of(listaDeImoveis));
    fixture.detectChanges();
    componente.carregarImoveis();
    expect(componente.imoveis).toEqual(listaDeImoveis);
    expect(componente.filteredImoveis).toEqual(listaDeImoveis);
  });

  it('Verificando se mostra um erro se o serviço não conseguir pegar os imóveis', () => {
    const mensagemDeErro = 'Não foi possível pegar os imóveis.';
    spyOn(console, 'error');
    servicoImovelFalso.getImoveis.and.returnValue(throwError(() => mensagemDeErro));
    fixture.detectChanges();
    componente.carregarImoveis();
    expect(console.error).toHaveBeenCalledWith('Erro ao carregar imóveis:', mensagemDeErro);
    expect(componente.imoveis).toEqual([]);
    expect(componente.filteredImoveis).toEqual([]);
  });

  it('Verificando se a busca por título funciona', () => {
    componente.imoveis = [
      { id: '1', titulo: 'Casa Azul', cidade: 'Belo Horizonte', estado: 'MG', valor: 200000 },
      { id: '2', titulo: 'Apartamento Amarelo', cidade: 'Curitiba', estado: 'PR', valor: 350000 },
    ];
    componente.filteredImoveis = [...componente.imoveis];
    componente.searchTerm = 'azul';
    servicoImovelFalso.getImoveis.and.returnValue(of(componente.imoveis));
    fixture.detectChanges();
    componente.filterImoveis();
    expect(componente.filteredImoveis.length).toBe(1);
    expect(componente.filteredImoveis[0].titulo).toBe('Casa Azul');
  });

  it('Verificando se a busca por cidade funciona', () => {
    componente.imoveis = [
      { id: '1', titulo: 'Casa na Praia', cidade: 'Salvador', estado: 'BA', valor: 400000 },
      { id: '2', titulo: 'Apê no Centro', cidade: 'Salvador', estado: 'BA', valor: 500000 },
    ];
    componente.filteredImoveis = [...componente.imoveis];
    componente.searchTerm = 'salvador';
    servicoImovelFalso.getImoveis.and.returnValue(of(componente.imoveis));
    fixture.detectChanges();
    componente.filterImoveis();
    expect(componente.filteredImoveis.length).toBe(2);
  });

  it('Verificando se a busca por estado funciona', () => {
    componente.imoveis = [
      { id: '1', titulo: 'Sítio Lindo', cidade: 'Gramado', estado: 'RS', valor: 600000 },
      { id: '2', titulo: 'Chalé Aconchegante', cidade: 'Canela', estado: 'RS', valor: 700000 },
    ];
    componente.filteredImoveis = [...componente.imoveis];
    componente.searchTerm = 'rs';
    servicoImovelFalso.getImoveis.and.returnValue(of(componente.imoveis));
    fixture.detectChanges();
    componente.filterImoveis();
    expect(componente.filteredImoveis.length).toBe(2);
  });
});