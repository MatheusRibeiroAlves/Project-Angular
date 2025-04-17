import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddImovelComponent } from './components/add-imovel/add-imovel.component';
import { DetalheImovelComponent } from './components/detalhe-imovel/detalhe-imovel.component';
import { EditarImovelComponent } from './components/editar-imovel/editar-imovel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-imovel', component: AddImovelComponent },
  { path: 'imovel/:id', component: DetalheImovelComponent },
  { path: 'editar-imovel/:id', component: EditarImovelComponent}

];

console.log('Rotas configuradas:', routes);
