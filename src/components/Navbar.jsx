import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Efeito para mudar o fundo ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projects' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
  <nav 
    className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled 
      ? 'bg-slate-950/90 backdrop-blur-xl py-4' 
      : 'bg-transparent py-6'
    }`}
  >
    {/* --- LINHA DE LUZ NEON (FIBRA ÓPTICA) --- */}
    <div className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-all duration-500 ${
      isScrolled ? 'opacity-100' : 'opacity-30'
    }`}>
      {/* O Gradiente principal */}
      <div className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
      
      {/* O "Glow" (Brilho que espalha para baixo) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[20px] bg-neon-cyan/20 blur-[15px] rounded-full"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
      
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-neon-cyan p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <Terminal size={20} className="text-slate-950" />
        </div>
        <span className="font-black text-xl tracking-tighter uppercase italic text-white">
          Emerson <span className="text-neon-cyan">Dev</span>
        </span>
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[11px] font-black uppercase tracking-[0.2em] hover:text-neon-cyan transition-all duration-300 ${
              location.pathname === link.path 
              ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
              : 'text-slate-300'
            }`}
          >
            {link.name}
          </Link>
        ))}
        
        <Link 
          to="/contact" 
          className="bg-transparent border-2 border-neon-pink text-neon-pink px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neon-pink hover:text-white transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]"
        >
          Orçamento
        </Link>
      </div>

      {/* MOBILE TOGGLE (Omitido para brevidade, mantenha o seu) */}
    </div>
  </nav>
);
};

export default Navbar;