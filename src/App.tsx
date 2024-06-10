import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListStudents from './pages/ListStudents';
import ListTeachers from './pages/ListTeachers';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list-students" element={<ListStudents />} />
        <Route path="/list-teachers" element={<ListTeachers />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />
      </Routes>
    </Router>
  );
};

export default App;
