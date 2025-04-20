import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AddImovelComponent } from './add-imovel.component';
import { ImovelService } from '../../services/imovel.service';
import { ImovelResponse } from '../../models/imovel.model';

describe('AddImovelComponent', () => {
  let componente: AddImovelComponent;
  let fixture: ComponentFixture<AddImovelComponent>;
  let servicoImovelSpy: jasmine.SpyObj<ImovelService>;
  let roteadorSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    servicoImovelSpy = jasmine.createSpyObj('ImovelService', ['adicionarImovel']);
    roteadorSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, AddImovelComponent],
      providers: [
        { provide: ImovelService, useValue: servicoImovelSpy },
        { provide: Router, useValue: roteadorSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddImovelComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componente).toBeTruthy();
  });

  it('Verificando se o servicoImovel.adicionarImovel é chamado ao cadastrarImovel', () => {
    const dadosImovel = { titulo: 'Teste', cidade: 'Teste', estado: 'TS', valor: 100, imagens: ['img1'] };
    componente.imovel = dadosImovel;
    const respostaMock: ImovelResponse = { id: '1', ...dadosImovel };
    servicoImovelSpy.adicionarImovel.and.returnValue(of(respostaMock));

    componente.cadastrarImovel();

    expect(servicoImovelSpy.adicionarImovel).toHaveBeenCalledWith(dadosImovel);
  });

  it('Verificando se navega para "/" em caso de cadastro concluido', () => {
    const dadosImovel = { titulo: 'Teste', cidade: 'Teste', estado: 'TS', valor: 100, imagens: ['img1'] };
    componente.imovel = dadosImovel;
    const respostaMock: ImovelResponse = { id: '1', ...dadosImovel };
    servicoImovelSpy.adicionarImovel.and.returnValue(of(respostaMock));

    componente.cadastrarImovel();

    expect(roteadorSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('Verificando se mensagem ErroCadastro é definida em caso de erro', () => {
    const erroMock = 'Erro no servidor';
    servicoImovelSpy.adicionarImovel.and.returnValue(throwError(() => erroMock));

    componente.cadastrarImovel();

    expect(componente.cadastroErroMensagem).toContain('Erro ao cadastrar o imóvel');
  });
});