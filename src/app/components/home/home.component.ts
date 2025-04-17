import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImovelService } from '../../services/imovel.service';
import { ImovelResponse } from '../../models/imovel.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imoveis: ImovelResponse[] = [];
  filteredImoveis: ImovelResponse[] = [];
  searchTerm: string = '';

  constructor(private imovelService: ImovelService) {}

  ngOnInit() {
    this.carregarImoveis();
  }

  carregarImoveis() {
    this.imovelService.getImoveis().subscribe({
      next: (data: ImovelResponse[]) => {
        this.imoveis = data;
        this.filteredImoveis = [...this.imoveis];
        this.filteredImoveis.forEach(imovel => { 
          console.log('ID do imóvel:', imovel.id);
        });
      },
      error: (error: any) => {
        console.error('Erro ao carregar imóveis:', error);
      }
    });
  }

  filterImoveis() {
    this.filteredImoveis = this.imoveis.filter(imovel =>
      imovel.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      imovel.cidade.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      imovel.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}