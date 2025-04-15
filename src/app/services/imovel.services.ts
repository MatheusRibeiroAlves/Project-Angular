import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  imoveisCadastrados: any[] = [];

  adicionarImovel(imovel: any) {
    this.imoveisCadastrados.push(imovel);
  }

  getImoveisCadastrados() {
    return this.imoveisCadastrados;
  }
}