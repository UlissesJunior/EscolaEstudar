import React, { useState, useEffect } from 'react';
import DynamicForm from '../components/DynamicForm';
import Toaster from '../components/Toaster';
import { Turma } from '../models/turma';
import { Aluno } from '../models/aluno';
import { Professor } from '../models/professor';

const RegisterClassRoom: React.FC = () => {
    const [classRooms, setClassRooms] = useState<Turma[]>(() => {
        return JSON.parse(localStorage.getItem('classRooms') || '[]');
    });
    const [students, setStudents] = useState<Aluno[]>([]);
    const [teachers, setTeachers] = useState<Professor[]>([]);
    const [toaster, setToaster] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string>('');

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
        setStudents(storedStudents);
        setTeachers(storedTeachers);
    }, []);

    const addClassRoom = (classRoom: Turma) => {
        const newClassRoom = { ...classRoom, id: Date.now() }; // Generate unique ID for the new class
        const updatedClassRooms = [...classRooms, newClassRoom];
        setClassRooms(updatedClassRooms);
        localStorage.setItem('classRooms', JSON.stringify(updatedClassRooms));
        setToaster('Turma Adicionada');
    };

    const handleLevelChange = (level: string) => {
        setSelectedLevel(level);
    };

    const filteredStudents = students.filter(student => student.nivelEnsino === selectedLevel && student.id !== undefined);
    const filteredTeachers = teachers.filter(teacher => teacher.nivelEnsino === selectedLevel && teacher.id !== undefined);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                {toaster && <Toaster message={toaster} removeToaster={() => setToaster(null)} />}
                <h2 className="text-xl font-semibold mb-2">Cadastrar Turma</h2>
                <DynamicForm<Turma>
                    schema={{
                        nome: { label: 'Nome', type: 'text' },
                        horario: { label: 'Horário', type: 'time' },
                        nivelEnsino: {
                            label: 'Nível de Ensino', type: 'select', options: [
                                { value: '', label: 'Selecione o nível de ensino' },
                                { value: 'Ensino Médio', label: 'Ensino Médio' },
                                { value: 'Ensino Fundamental', label: 'Ensino Fundamental' },
                                { value: 'Ensino Infantil', label: 'Ensino Infantil' },
                            ]
                        },
                        alunos: {
                            label: 'Alunos', type: 'checkbox', options: filteredStudents.map(student => ({ value: student.id!.toString(), label: student.nome }))
                        },
                        professor: {
                            label: 'Professor', type: 'select', options: [
                                { value: '', label: 'Selecione o Professor' },
                                ...filteredTeachers.map(teacher => ({ value: teacher.id!.toString(), label: teacher.nome }))
                            ]
                        }
                    }}
                    onChange={(key, value) => {
                        if (key === 'nivelEnsino') {
                            handleLevelChange(value);
                        }
                    }}
                    onSubmit={(data) => {
                        // Convertendo os dados de alunos selecionados para o formato correto
                        const selectedAlunos = filteredStudents
                            .filter(student => (data.alunos as unknown as string[]).includes(student.id!.toString()))
                            .map(student => ({ id: student.id!, nome: student.nome }));
                        
                        // Convertendo o dado do professor selecionado para o formato correto
                        const selectedProfessor = filteredTeachers.find(teacher => teacher.id === parseInt(data.professor as unknown as string));

                        if (!selectedProfessor) {
                            setToaster('Professor não encontrado');
                            return;
                        }

                        addClassRoom({
                            ...data,
                            alunos: selectedAlunos,
                            professor: { id: selectedProfessor.id!, nome: selectedProfessor.nome }
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default RegisterClassRoom;
