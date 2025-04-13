import { Routes } from '@angular/router';
import { AddImovelComponent } from './components/add-imovel/add-imovel.component';

export const routes: Routes = [
    { path: '', redirectTo: '/add-imovel', pathMatch: 'full' }, 
    { path: 'add-imovel', component: AddImovelComponent }
  ];