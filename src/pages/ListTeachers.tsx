import React, { useState, useEffect } from 'react';
import List from '../components/List';
import EditDialog from '../dialogs/Edit';
import { Professor } from '../models/professor';

const ListTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<(Professor & { id: number })[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Professor & { id: number } | null>(null);

  useEffect(() => {
    const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    setTeachers(storedTeachers);
  }, []);

  const deleteTeacher = (id: number) => {
    const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };

  const openEditDialog = (teacher: Professor & { id: number }) => {
    setCurrentTeacher(teacher);
    setIsEditDialogOpen(true);
  };

  const saveTeacher = (updatedTeacher: Professor & { id: number }) => {
    const updatedTeachers = teachers.map(teacher =>
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    );
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Listar Professores</h2>
        <List<Professor & { id: number }>
          data={teachers}
          onDelete={deleteTeacher}
          onEdit={openEditDialog}
        />
        {currentTeacher && (
          <EditDialog<Professor>
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={saveTeacher}
            schema={{ nome: 'Nome', disciplina: 'Disciplina' }}
            initialData={currentTeacher}
          />
        )}
      </div>
    </div>
  );
};

export default ListTeachers;
