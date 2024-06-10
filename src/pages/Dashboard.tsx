import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
        <Link 
          to="/list-students" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Listar Alunos
        </Link>
        <Link 
          to="/list-teachers" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Listar Professores
        </Link>
        <Link 
          to="/register-student" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Cadastrar Aluno
        </Link>
        <Link 
          to="/register-teacher" 
          className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center text-xl font-semibold hover:scale-105 transform transition-all duration-200"
        >
          Cadastrar Professor
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
