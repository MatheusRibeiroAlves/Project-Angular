export interface ImovelResponse {
    id: string;
    titulo: string;
    cidade: string;
    estado: string;
    valor: number;
    imagens?: string[];
  }

  export interface ImovelCreate {
    titulo: string;
    cidade: string;
    estado: string;
    valor: number;
    imagens?: string[];
  }