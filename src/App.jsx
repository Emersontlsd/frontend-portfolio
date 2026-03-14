import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundStars from './components/BackgroundStars';

// Páginas
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Componente auxiliar para gerenciar elementos globais
const AppContent = () => {
  const location = useLocation();
  
  // Define quais rotas NÃO devem exibir Navbar e Footer (ex: Dashboard e Login)
  const isAdminPage = location.pathname.startsWith('/dashboard') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Só renderiza a Navbar se NÃO for página administrativa */}
      {!isAdminPage && <Navbar />}

      <main className="flex-grow bg-transparent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div className="text-white pt-32 text-center">Página não encontrada 404</div>} />
        </Routes>
      </main>

      {/* Só renderiza o Footer se NÃO for página administrativa */}
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* O Fundo estrelado fica fixo em todas as páginas */}
      <BackgroundStars />
      <AppContent />
    </Router>
  );
}

export default App;