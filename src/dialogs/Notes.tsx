import React, { useState, useEffect } from 'react';
import { Turma } from '../models/turma';

interface NotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  turma: Turma & { id: number };
  onSave: (turma: Turma & { id: number }) => void;
}

const Notes: React.FC<NotesDialogProps> = ({
  isOpen,
  onClose,
  turma,
  onSave,
}) => {
  const [students, setStudents] = useState(turma.alunos);

  useEffect(() => {
    setStudents(turma.alunos);
  }, [turma]);

  const handleNoteChange = (studentId: number, note: number) => {
    if (note < 0 || note > 10) return;
    const updatedStudents = students?.map((student) =>
      student.id === studentId ? { ...student, nota: note } : student
    );
    setStudents(updatedStudents);
  };

  const handleSave = () => {
    const updatedClassRoom = { ...turma, alunos: students };
    onSave(updatedClassRoom);
    onClose();
  };

  const studentSchema = {
    id: { label: 'ID' },
    nome: { label: 'Nome' },
    nota: { label: 'Nota' },
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Lançar Notas</h2>
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {Object.keys(studentSchema).map((key) => (
                  <th
                    key={key}
                    className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {studentSchema[key as keyof typeof studentSchema].label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students?.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {student.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {student.nome}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <input
                      type="number"
                      value={student.nota || ''}
                      onChange={(e) =>
                        handleNoteChange(student.id, Number(e.target.value))
                      }
                      className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Notes;
