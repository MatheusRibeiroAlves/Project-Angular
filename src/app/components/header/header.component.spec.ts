import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verifica se ao iniicar o menu está fechado', () => {
    expect(component.isMenuOpen).toBeFalse();
  });

  it('verifica se está abrindo e fechando o menu ao clicar', () => {
    expect(component.isMenuOpen).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('vericica se  a barra de navegação foi exibida', () => {
    const elementoHtml = fixture.nativeElement as HTMLElement;
    const navegacao = elementoHtml.querySelector('nav');
    expect(navegacao).toBeTruthy();
  });

  it('deve ter links para navegar entre as páginas', () => {
    const elementoHtml = fixture.nativeElement as HTMLElement;
    const links = elementoHtml.querySelectorAll('a[routerLink]');
    expect(links.length).toBeGreaterThan(0);
  });
});