import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imoveis: any[] = [];
  filteredImoveis: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarImoveis();
  }

  carregarImoveis() {
    this.http.get<any[]>('/api/imoveis/').subscribe(
      data => {
        this.imoveis = data;
        this.filteredImoveis = [...this.imoveis]; 
      },
      error => {
        console.error('Erro ao carregar imóveis:', error);
      }
    );
  }

  filterImoveis() {
    this.filteredImoveis = this.imoveis.filter(imovel =>
      imovel.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      imovel.cidade.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      imovel.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}