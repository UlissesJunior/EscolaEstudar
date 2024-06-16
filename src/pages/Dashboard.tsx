import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
        <Link 
          to="/register-student" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Cadastrar Aluno
        </Link>
        <Link 
          to="/list-students" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Listar Alunos
        </Link>
        <Link 
          to="/register-teacher" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Cadastrar Professor
        </Link>
        <Link 
          to="/list-teachers" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Listar Professores
        </Link>
        <Link 
          to="/register-classroom" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Cadastrar Turma
        </Link>
        <Link 
          to="/list-classrooms" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Listar Turmas
        </Link>
        <Link
          to="/register-notes"
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Registrar Notas da Turma
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
