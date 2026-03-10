import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Importação obrigatória dos estilos do Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProjectSlider = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // URL Segura para evitar o erro de 'undefined'
  const API_URL = import.meta.env.VITE_API_URL; // || 'https://backend-portfolio-emerson.vercel.app';

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        
        // Proteção contra retornos que não são JSON (erro 404 da Vercel)
        if (!res.ok) throw new Error('Falha ao conectar com a API');
        
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro no Slider: ", err);
      }
    };

    loadProjects();
  }, [API_URL]);

  // Se não houver projetos, não renderiza nada para não quebrar o layout
  if (projects.length === 0) return (
    <div className="w-full py-20 text-center text-slate-500 italic">
      Iniciando propulsores do Slider...
    </div>
  );

  return (
    <div className='w-full py-12 relative z-10'>
      <Swiper 
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={projects.length >= 3} // Só faz loop se tiver projetos suficientes
        
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3},
        }}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className='mySwiper'
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="max-w-[320px] md:max-w-[450px] py-10">
            <div className="group relative bg-slate-900/80 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl">
              
              {/* Imagem do Projeto */}
              <div className='h-64 overflow-hidden relative'>
                <img 
                  src={project.imagem}
                  alt={project.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              </div>

              {/* Conteúdo */}
              <div className='p-6'>
                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter group-hover:text-neon-cyan transition-colors">
                  {project.titulo}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">
                  {project.descricao || "Projeto incrível desenvolvido com as melhores tecnologias."}
                </p>

                <div className='flex items-center justify-between border-t border-white/5 pt-4'>
                  <a 
                    href={project.link_demo}
                    target='_blank'
                    rel='noreferrer'
                    className="flex items-center gap-2 text-neon-cyan font-black text-[10px] uppercase tracking-widest hover:brightness-125 transition-all"
                  >
                    LIVE PREVIEW <ExternalLink size={14} />
                  </a>

                  <button 
                    onClick={() => navigate('/projects')}
                    className="p-3 bg-white/5 rounded-full text-white hover:bg-neon-pink hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all"
                    title="Ver todos"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectSlider;