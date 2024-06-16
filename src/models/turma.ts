export interface Turma {
    id?: number;
    nome?: string;
    horario?: string;
    nivelEnsino?: string;
    alunos?: { id: number; nome: string; nota?: number }[];
    professor?: { id: number; nome: string };
  }
  