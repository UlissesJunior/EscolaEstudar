import React, { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import Toaster from '../components/Toaster';
import { Professor } from '../models/professor';

const RegisterTeacher: React.FC = () => {
  const [teachers, setTeachers] = useState<(Professor & { id: number })[]>(() => {
    return JSON.parse(localStorage.getItem('teachers') || '[]');
  });
  const [toaster, setToaster] = useState<string | null>(null);

  const addTeacher = (teacher: Professor) => {
    const newTeacher = { ...teacher, id: Date.now() };
    const updatedTeachers = [...teachers, newTeacher];
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    setToaster('Professor Adicionado');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {toaster && <Toaster message={toaster} removeToaster={() => setToaster(null)} />}
        <h2 className="text-xl font-semibold mb-2">Cadastrar Professor</h2>
        <DynamicForm<Professor>
          schema={{
            nome: { label: 'Nome', type: 'text' },
            nivelEnsino: {
              label: 'Nível de Ensino', type: 'select', options: [
                { value: '', label: 'Selecione o nível de ensino' },
                { value: 'Ensino Médio', label: 'Ensino Médio' },
                { value: 'Ensino Fundamental', label: 'Ensino Fundamental' },
                { value: 'Ensino Infantil', label: 'Ensino Infantil' },
              ]
            },
          }}
          onSubmit={addTeacher}
        />
      </div>
    </div>
  );
};

export default RegisterTeacher;
