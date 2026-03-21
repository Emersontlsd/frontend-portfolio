import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 bg-transparent">
      <div className="max-w-4xl text-center">
        {/* Animação de entrada para todo o bloco */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* TÍTULO PRINCIPAL COM TYPEWRITER */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none text-white uppercase italic">
            DESIGN & <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] inline-block min-h-[1.1em]">
              <Typewriter
                options={{
                  strings: ['CODE', 'DRIVE', 'SOLUTIONS', 'FUTURE'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 100,
                  cursor: "|",
                  wrapperClassName: "typewriter-text",
                }}
              />
            </span>
          </h1>

          {/* SUBTÍTULO IMPACTANTE */}
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6 uppercase tracking-[4px]">
            Transformando desafios em soluções digitais eficientes.
          </h2>

          {/* CORPO DO TEXTO (STORYTELLER) */}
          <div className="text-slate-400 text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed space-y-4 text-justify md:text-center">
            <p>
              Olá! Sou <span className='text-white font-semibold'>Emerson</span>, desenvolvedor Full Stack com formação em 
              <span className="text-slate-200"> Análise e Desenvolvimento de Sistemas (Senac-DF)</span> e especialização em 
              <span className="text-slate-200"> Front-end (IFB)</span>.
            </p>

            <p>
              Minha jornada vai muito além das linhas de código. Enquanto percorro as ruas de Brasília como 
              <span className="text-white font-medium"> motorista executivo e por aplicativo em um carro elétrico</span>, estou sempre observando como a tecnologia facilita a vida das pessoas. 
              Essa paixão por resolver dificuldades, sejam elas minhas ou de terceiros, foi o que me trouxe até aqui.
            </p>

            <p>
              No ecossistema <span className="text-cyan-400 font-mono">JavaScript (React & Node)</span>, crio aplicações sólidas e intuitivas. 
              Acredito que um bom desenvolvedor encontra a solução mais inteligente para um desafio complexo, unindo lógica e sustentabilidade.
            </p>

            <p className="text-slate-300 font-medium italic">
              Vamos conversar sobre como posso ajudar o seu próximo projeto a decolar?
            </p>
          </div>

          {/* BOTÃO DE AÇÃO */}
          <div className="flex justify-center gap-6">
            <button
              onClick={() => document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 bg-cyan-400 text-slate-950 px-10 py-4 rounded-full font-black text-xs tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] uppercase"
            >
              <Rocket size={18} strokeWidth={3} /> Ver Portfólio
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;