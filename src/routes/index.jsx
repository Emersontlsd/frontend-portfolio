import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando as Páginas
import Home from '../pages/Home';
import ProjectsList from '../pages/ProjectList';
import Contact from '../pages/Contact';
import Feedback from '../pages/Feedback';
import ProjectDetails from '../pages/ProjectDetails';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const AppRoutes = ({ projects }) => {
  return (
    <Routes>
      <Route path="/" element={<Home projects={projects} />} />
      <Route path="/projetos" element={<ProjectsList projects={projects} />} />
      <Route path="/projeto/:id" element={<ProjectDetails projects={projects} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
};

export default AppRoutes;