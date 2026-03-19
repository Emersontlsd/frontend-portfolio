import React from 'react';
import { Link } from 'react-router-dom';
// Trocamos Planet por Orbit para evitar o SyntaxError
import { Rocket, Orbit, MapPinOff } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      
      {/* ÍCONES ANIMADOS */}
      <div className="relative mb-12 flex items-center justify-center">
        <MapPinOff size={100} className="text-pink-500 opacity-20" />
        <Rocket size={60} className="text-cyan-400 absolute -top-10 -right-10 animate-bounce" />
        {/* Usando Orbit no lugar de Planet */}
        <Orbit size={120} className="text-white/10 absolute -z-10 animate-spin-slow" />
      </div>

      {/* TEXTO PRINCIPAL */}
      <h1 className="text-9xl font-black italic tracking-tighter text-white mb-4">
        40<span className="text-cyan-400">4</span>
      </h1>
      <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-6">
        Perdido no <span className="text-pink-500">Espaço?</span>
      </h2>
      <p className="text-slate-400 text-sm italic max-w-sm mb-10 leading-relaxed">
        Ops! Parece que você navegou para uma área inexplorada ou a página que você procura foi movida por um buraco de minhoca.
      </p>

      {/* BOTÃO PARA VOLTAR */}
      <Link 
        to="/" 
        className="bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(6,182,212,0.3)] group"
      >
        <Rocket size={16} className="group-hover:-translate-y-1 transition-transform" /> VOLTAR PARA A BASE
      </Link>
    </div>
  );
};

export default NotFound;