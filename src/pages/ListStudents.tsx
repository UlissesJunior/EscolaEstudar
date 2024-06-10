import React, { useState, useEffect } from 'react';
import List from '../components/List';
import EditDialog from '../dialogs/Edit';
import { Aluno } from '../models/aluno';

const ListStudents: React.FC = () => {
  const [students, setStudents] = useState<(Aluno & { id: number })[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Aluno & { id: number } | null>(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(storedStudents);
  }, []);

  const deleteStudent = (id: number) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const openEditDialog = (student: Aluno & { id: number }) => {
    setCurrentStudent(student);
    setIsEditDialogOpen(true);
  };

  const saveStudent = (updatedStudent: Aluno & { id: number }) => {
    const updatedStudents = students.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Listar Alunos</h2>
        <List<Aluno & { id: number }>
          data={students}
          onDelete={deleteStudent}
          onEdit={openEditDialog}
        />
        {currentStudent && (
          <EditDialog<Aluno>
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={saveStudent}
            schema={{ nome: 'Nome', matricula: 'Matrícula' }}
            initialData={currentStudent}
          />
        )}
      </div>
    </div>
  );
};

export default ListStudents;
