import { Sexo } from "./Sexo";

export interface Usuario {
  id: number;
  nome: string;
  dataNascimnento: Date;
  email: string;
  senha: string;
  sexoId: number;
  ativo: boolean;
}

