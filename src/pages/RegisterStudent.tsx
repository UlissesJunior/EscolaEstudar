import React, { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import Toaster from '../components/Toaster';
import { Aluno } from '../models/aluno';

const RegisterStudent: React.FC = () => {
  const [students, setStudents] = useState<(Aluno & { id: number })[]>(() => {
    return JSON.parse(localStorage.getItem('students') || '[]');
  });
  const [toaster, setToaster] = useState<string | null>(null);

  const addStudent = (student: Aluno) => {
    const newStudent = { ...student, id: Date.now() };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setToaster('Aluno Adicionado');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {toaster && <Toaster message={toaster} removeToaster={() => setToaster(null)} />}
        <h2 className="text-xl font-semibold mb-2">Cadastrar Aluno</h2>
        <DynamicForm<Aluno>
          schema={{
            nome: { label: 'Nome', type: 'text' },
            dataNascimento: { label: 'Data de Nascimento', type: 'date' },
            nivelEnsino: {
              label: 'Nível de Ensino', type: 'select', options: [
                { value: '', label: 'Selecione o nível de ensino' },
                { value: 'Ensino Médio', label: 'Ensino Médio' },
                { value: 'Ensino Fundamental', label: 'Ensino Fundamental' },
                { value: 'Ensino Infantil', label: 'Ensino Infantil' },
              ]
            },
          }}
          onSubmit={addStudent}
        />
      </div>
    </div>
  );
};

export default RegisterStudent;
