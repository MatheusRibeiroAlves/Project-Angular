import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImovelService } from '../../services/imovel.service';
import { ImovelResponse, ImovelCreate } from '../../models/imovel.model';

@Component({
  selector: 'app-editar-imovel',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './editar-imovel.component.html',
  styleUrl: './editar-imovel.component.css'
})
export class EditarImovelComponent implements OnInit {
  imovelId: string | null = null;
  imovel: ImovelCreate = {
    titulo: '',
    cidade: '',
    estado: '',
    valor: 0,
    imagens: [],
  };
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  novasImagensPreview: string[] = [];
  novasImagensParaUpload: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private imovelService: ImovelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.imovelId = params.get('id');
      if (this.imovelId) {
        this.carregarImovelParaEdicao(this.imovelId);
      }
    });
  }

  carregarImovelParaEdicao(id: string): void {
    this.isLoading = true;
    this.imovelService.getImovel(id).subscribe({
      next: (data: ImovelResponse) => {
        this.imovel = { ...data, imagens: data.imagens || [] };
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar imóvel para edição.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  removerImagem(index: number): void {
    if (this.imovel && this.imovel.imagens) {
      this.imovel.imagens.splice(index, 1);
    }
  }

  adicionarNovasImagens(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.novasImagensParaUpload.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.novasImagensPreview.push(e.target.result as string);
        };
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    }
  }

  formatarValor() {
    // Formatar o valor como R$ usando a notação de moeda
    let valor = this.imovel.valor.toString().replace(/[^\d]/g, ''); // Remover qualquer coisa que não seja número
    if (valor) {
      this.imovel.valor = parseFloat(valor) / 100;
    }
  }

  salvarEdicao(): void {
    if (this.imovelId) {
      this.isLoading = true;

      const imovelParaAtualizar = { ...this.imovel, imagens: [...(this.imovel.imagens ?? []), ...this.novasImagensPreview] };

      this.imovelService.updateImovel(this.imovelId, imovelParaAtualizar).subscribe({
        next: (response) => {
          this.successMessage = `Imóvel com ID ${response.id} atualizado com sucesso.`;
          this.isLoading = false;
          this.router.navigate(['/imovel', response.id]);
        },
        error: (error) => {
          this.errorMessage = 'Erro ao salvar as alterações do imóvel.';
          console.error(error);
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID do imóvel inválido.';
    }
  }
}