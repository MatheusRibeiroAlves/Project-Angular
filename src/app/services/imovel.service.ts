import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImovelResponse } from '../models/imovel.model';
import { ImovelCreate } from '../models/imovel.model';


@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private apiUrl = 'http://127.0.0.1:8000/api/imoveis'; 

  constructor(private http: HttpClient) { }

  
  adicionarImovel(imovel: Omit<ImovelResponse, 'id'>): Observable<ImovelResponse> {
    return this.http.post<ImovelResponse>(this.apiUrl, imovel);
  }

  
  getImoveis(): Observable<ImovelResponse[]> {
    return this.http.get<ImovelResponse[]>(this.apiUrl);
  }

  
  getImovel(id: string): Observable<ImovelResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ImovelResponse>(url);
  }

  deleteImovel(id: string): Observable<ImovelResponse> {
    return this.http.delete<ImovelResponse>(`${this.apiUrl}/${id}`);
  }

  updateImovel(id: string, imovel: ImovelCreate): Observable<ImovelResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ImovelResponse>(url, imovel);
  }
}