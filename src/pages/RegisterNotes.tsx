import React, { useState, useEffect } from 'react';
import List from '../components/List';
import Notes from '../dialogs/Notes';
import { Turma } from '../models/turma';

const RegisterNotes: React.FC = () => {
  const [classRooms, setClassRooms] = useState<(Turma & { id: number })[]>([]);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [currentClassRoom, setCurrentClassRoom] = useState<Turma & { id: number } | null>(null);

  useEffect(() => {
    const storedClassRooms = JSON.parse(localStorage.getItem('classRooms') || '[]');
    setClassRooms(storedClassRooms);
  }, []);

  const openNotesDialog = (classRoom: Turma & { id: number }) => {
    setCurrentClassRoom(classRoom);
    setIsNotesDialogOpen(true);
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
        <h2 className="text-xl font-semibold mb-4">Lançar Notas</h2>
        <List<Turma & { id: number }>
          data={classRooms}
          schema={schema}
          onNotes={openNotesDialog}
        />
        {currentClassRoom && (
          <Notes
            isOpen={isNotesDialogOpen}
            onClose={() => setIsNotesDialogOpen(false)}
            turma={currentClassRoom}
            onSave={saveClassRoom}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterNotes;
