import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
      <div className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-all duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-30'
      }`}>
        <div className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
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

        {/* MOBILE TOGGLE - Adicionado aqui */}
        <button 
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} className="text-neon-cyan" /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU - O bloco que faltava */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-slate-950/98 backdrop-blur-2xl transition-all duration-500 md:hidden ${
        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex flex-col h-full p-8 pt-24 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-black uppercase italic tracking-tighter transition-all ${
                location.pathname === link.path 
                ? 'text-neon-cyan translate-x-4' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-8 border-t border-white/5">
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="inline-block bg-neon-pink text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(236,72,153,0.4)]"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;