// add-imovel.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    imagens: [] as string []
  };

  previewImages: string[] = []; 

  cadastroSucesso: boolean = false;

  constructor(private http: HttpClient) {}

  cadastrarImovel() {
    this.http.post('/api/imoveis/', this.imovel).subscribe(
      response => {
        console.log('Imóvel cadastrado com sucesso:', response);
        this.imovel = { titulo: '', cidade: '', estado: '', valor: 0, imagens: [] };
        this.previewImages = []; 
        this.cadastroSucesso = true;

      },
      error => {
        console.error('Erro ao cadastrar imóvel:', error);
        this.cadastroSucesso = false;
      }
    );
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