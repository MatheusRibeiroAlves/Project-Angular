import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ImovelService } from '../../services/imovel.service';
import { ImovelResponse } from '../../models/imovel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-imovel', 
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './detalhe-imovel.component.html',
  styleUrls: ['./detalhe-imovel.component.css']
})
export class DetalheImovelComponent implements OnInit {
  imovel: ImovelResponse | undefined;
  imovelId: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private imovelService: ImovelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.imovelId = params.get('id');
      if (this.imovelId) {
        this.carregarDetalhesImovel(this.imovelId);
      }
    });
  }

  carregarDetalhesImovel(id: string): void {
    this.imovelService.getImovel(id).subscribe(
      (data: ImovelResponse) => {
        this.imovel = data;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar detalhes do imóvel.';
        console.error(error);
      }
    );
  }


  deletarImovel(): void {
    if (this.imovel && this.imovel.id) {
      this.imovelService.deleteImovel(this.imovel.id).subscribe({
        next: (response) => {
          this.successMessage = `Imóvel com ID ${response.id} deletado com sucesso.`;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'Erro ao deletar o imóvel.';
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'ID do imóvel inválido para deleção.';
    }
  }
}