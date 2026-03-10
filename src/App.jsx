import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundStars from './components/BackgroundStars';

//  páginas aqui...
import Home from './pages/Home';
import ProjectList from './pages/ProjectList'
import Contact from './pages/Contact';
import Feedback from './pages/Feedback'

function App() {
  return (
    <Router>
      {/* 1. O Fundo fixo atrás de tudo */}
      <BackgroundStars />

      {/* 2. O Conteúdo do site em uma camada acima (z-10 opcional aqui) */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* main deve ser transparente para o fundo brilhar */}
        <main className="flex-grow bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;