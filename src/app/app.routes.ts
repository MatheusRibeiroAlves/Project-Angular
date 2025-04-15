import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddImovelComponent } from './components/add-imovel/add-imovel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-imovel', component: AddImovelComponent }
];