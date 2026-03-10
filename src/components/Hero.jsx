import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-20 px-6 bg-transparent">
      <div className="max-w-4xl text-center">
        {/* Animação de entrada para o título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white">
            DESIGN & <br />
            <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.6)] inline-block min-h-[1em]">
              <Typewriter
                options={{
                  strings: ['CODE', 'DEVELOPER', 'SOLUTIONS', 'FUTURE'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 100,
                  cursor: "", // Personaliza o cursor
                  wrapperClassName: "typewriter-text", // Classe para garantir estilo
                }}
              />
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Olá, eu sou o <span className='text-white font-semibold'>EMERSON S.</span>. 
            Desenvolvedor Full-Stack focado em criar expêriencias digitais
            que unem estética e performance.
          </p>

          <div className="flex justify-center gap-6">
            <button
            onClick={() => document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-neon-cyan text-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]">
              <Rocket size={20} /> Ver Portfólio
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;