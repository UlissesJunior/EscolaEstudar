import React from 'react';
import { Turma } from '../models/turma';
import List from '../components/List';
import PieChart from '../components/graphics/StatusAluno';
import BarChart from '../components/graphics/NotasPorAluno';

interface InfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  turma: Turma | null;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ isOpen, onClose, turma }) => {
  if (!isOpen || !turma) return null;

  const studentSchema = {
    id: { label: 'ID' },
    nome: { label: 'Nome' },
    nota: { label: 'Nota' }
  };

  const teacherSchema = {
    id: { label: 'ID' },
    nome: { label: 'Nome' }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl h-4/5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Informações da Turma</h2>
        <div><strong>ID:</strong> {turma.id}</div>
        <div><strong>Nome:</strong> {turma.nome}</div>
        <div><strong>Horário:</strong> {turma.horario}</div>
        <div><strong>Nível de Ensino:</strong> {turma.nivelEnsino}</div>
        <br/>
        <div>
          <h3><strong>Professor</strong></h3>
          <List data={turma.professor ? [turma.professor] : []} schema={teacherSchema} />
        </div>
          <br/>
        <div>
          <h3><strong>Alunos</strong></h3>
          <List data={turma.alunos || []} schema={studentSchema} />
        </div>
        <div className="flex justify-end mt-4">
        </div>
        <br/>
        <div>
          <PieChart id={turma.id} />
          <br/>
          <BarChart id={turma.id} />
        </div>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default InfoDialog;
