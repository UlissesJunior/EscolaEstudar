import React, { useState, useEffect } from 'react';
import List from '../components/List';
import EditDialog from '../dialogs/Edit';
import InfoDialog from '../dialogs/Info';
import { Turma } from '../models/turma';
import { Aluno } from '../models/aluno';

const ListClassRooms: React.FC = () => {
  const [classRooms, setClassRooms] = useState<(Turma & { id: number })[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [currentClassRoom, setCurrentClassRoom] = useState<Turma & { id: number } | null>(null);
  const [studentsInThisLevel, setStudentsInThisLevel] = useState<Aluno[]>([]);
  const [teachersInThisLevel, setTeachersInThisLevel] = useState<any[]>([]);

  useEffect(() => {
    const storedClassRooms = JSON.parse(localStorage.getItem('classRooms') || '[]');
    setClassRooms(storedClassRooms);
  }, []);

  const deleteClassRoom = (id: number) => {
    const updatedClassRooms = classRooms.filter(classRoom => classRoom.id !== id);
    setClassRooms(updatedClassRooms);
    localStorage.setItem('classRooms', JSON.stringify(updatedClassRooms));
  };

  const openEditDialog = (classRoom: Turma & { id: number }) => {
    setCurrentClassRoom(classRoom);
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const studentsNivelFilter = students.filter((student: Aluno) => student.nivelEnsino === classRoom.nivelEnsino);

    const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    const teachersNivelFilter = teachers.filter((teacher: any) => teacher.nivelEnsino === classRoom.nivelEnsino);

    setStudentsInThisLevel(studentsNivelFilter);
    setTeachersInThisLevel([
      { value: classRoom.professor?.id!.toString(), label: classRoom.professor?.nome },
      ...teachersNivelFilter.filter((teacher: any) => teacher.id !== classRoom.professor?.id).map((teacher: any) => ({ value: teacher.id!.toString(), label: teacher.nome }))
    ]);
    setIsEditDialogOpen(true);
  };

  const openInfoDialog = (classRoom: Turma & { id: number }) => {
    setCurrentClassRoom(classRoom);
    setIsInfoDialogOpen(true);
  };

  const saveClassRoom = (updatedClassRoom: Turma & { id: number }) => {
    const updatedClassRooms = classRooms.map(classRoom =>
      classRoom.id === updatedClassRoom.id ? updatedClassRoom : classRoom
    );
    setClassRooms(updatedClassRooms);
    localStorage.setItem('classRooms', JSON.stringify(updatedClassRooms));
  };

  const schema = {
    id: { label: 'ID' },
    nome: { label: 'Nome' }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Listar Turmas</h2>
        <List<Turma & { id: number }>
          data={classRooms}
          onDelete={deleteClassRoom}
          onEdit={openEditDialog}
          onInfo={openInfoDialog}
          schema={schema}
        />
        {currentClassRoom && (
          <>
            <EditDialog<Turma>
              isOpen={isEditDialogOpen}
              onClose={() => setIsEditDialogOpen(false)}
              onSave={saveClassRoom}
              schema={{
                nome: { label: 'Nome', type: 'text' },
                horario: { label: 'Horário', type: 'time' },
                alunos: {
                  label: 'Alunos', type: 'checkbox', options: studentsInThisLevel.map(student => ({
                    value: student.id!.toString(),
                    label: student.nome,
                    checked: currentClassRoom.alunos?.some(aluno => aluno.id === student.id)
                  }))
                },
                professor: {
                  label: 'Professor', type: 'select', options: teachersInThisLevel
                }
              }}
              initialData={currentClassRoom}
            />
            <InfoDialog
              isOpen={isInfoDialogOpen}
              onClose={() => setIsInfoDialogOpen(false)}
              turma={currentClassRoom}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ListClassRooms;