import React from 'react';

const BackgroundStars = () => {
  // Gerador de estrelas aleatórias via Shadow (700 estrelas)
  const generateStars = (count) => {
    let stars = "";
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      stars += `${x}px ${y}px #fff${i % 10 === 0 ? ', ' : ' '}`; // Adiciona vírgula a cada sombra
    }
    return stars.trim().replace(/\s+$/, "").replace(/ $/, "").split(' ').join(', ');
  };

  return (
    <>
      <style>
        {`
          @keyframes starsPulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          .stars-layer {
            width: 1px;
            height: 1px;
            background: transparent;
            position: absolute;
            border-radius: 50%;
          }
        `}
      </style>
      
      <div className="fixed inset-0 z-[-10] bg-[#020617] overflow-hidden pointer-events-none">
        {/* Camada 1: Estrelas Pequenas */}
        <div 
          className="stars-layer animate-[starsPulse_4s_infinite]"
          style={{ boxShadow: `
            ${Array.from({length: 400}).map(() => `${Math.random()*2000}px ${Math.random()*2000}px #ffffff`).join(', ')}
          `}}
        ></div>

        {/* Camada 2: Estrelas Médias (Azuladas) */}
        <div 
          className="stars-layer animate-[starsPulse_7s_infinite]"
          style={{ 
            width: '2px', 
            height: '2px',
            boxShadow: `
            ${Array.from({length: 100}).map(() => `${Math.random()*2000}px ${Math.random()*2000}px #06b6d4`).join(', ')}
          `}}
        ></div>

        {/* Efeito de Nebulosa Suave no fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1)_0%,_transparent_80%)]"></div>
      </div>
    </>
  );
};

export default BackgroundStars;