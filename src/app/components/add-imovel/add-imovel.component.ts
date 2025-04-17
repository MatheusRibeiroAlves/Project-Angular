import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ImovelResponse } from '../../models/imovel.model';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-add-imovel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-imovel.component.html',
  styleUrls: ['./add-imovel.component.css']
})
export class AddImovelComponent {
  imovel = {
    titulo: '',
    cidade: '',
    estado: '',
    valor: 0,
    imagens: [] as string[]
  };

  previewImages: string[] = [];
  cadastroSucesso: boolean = false;
  cadastroErroMensagem: string = '';

  constructor(
    private imovelService: ImovelService,
    private router: Router
  ) {}

  private resetForm() {
    this.imovel = { titulo: '', cidade: '', estado: '', valor: 0, imagens: [] };
    this.previewImages = [];
    this.cadastroSucesso = false;
    this.cadastroErroMensagem = '';
  }

  cadastrarImovel() {
    this.imovelService.adicionarImovel(this.imovel).subscribe({
      next: (response: ImovelResponse) => {
        console.log('Imóvel cadastrado com sucesso:', response);
        this.resetForm();
        this.cadastroSucesso = true;
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Erro ao cadastrar imóvel:', error);
        this.cadastroSucesso = false;
        this.cadastroErroMensagem = 'Erro ao cadastrar o imóvel. Por favor, tente novamente.'; // Exemplo de mensagem de erro
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imovel.imagens = [];
      this.previewImages = [];
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imovel.imagens.push(e.target.result as string);
          this.previewImages.push(e.target.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}