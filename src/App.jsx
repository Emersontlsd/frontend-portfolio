import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import { Navbar, Footer, BackgroundStars, NotFound } from './components';


import Home from './pages/Home';
import ProjectList from './pages/Projects/List';
import ProjectDetails from './pages/Projects/Details';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/dashboard') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}

      <main className="flex-grow bg-transparent pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <BackgroundStars />
      <AppContent />
    </Router>
  );
}

export default App;