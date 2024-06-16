import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListStudents from './pages/ListStudents';
import ListTeachers from './pages/ListTeachers';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import RegisterClassRoom from './pages/RegisterClassroom';
import ListClassRooms from './pages/ListClasrooms';
import RegisterNotes from './pages/RegisterNotes';

const App: React.FC = () => {
  return (
    <Router>
      {/* a */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list-students" element={<ListStudents />} />
        <Route path="/list-teachers" element={<ListTeachers />} />
        <Route path="/list-classrooms" element={<ListClassRooms />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />
        <Route path='/register-classroom' element={<RegisterClassRoom />}/>
        <Route path='/register-notes' element={<RegisterNotes />}/>
      </Routes>
    </Router>
  );
};

export default App;
