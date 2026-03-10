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
  const [ projects, setProjects ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Errono Slider ", err));

  }, []);

  if(projects.length === 0) return null;

  return (
    <div className='w-full py-12'>
      <Swiper 
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        loopedSlides={3}

        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3},
        }}

        autoplay={{
          delay: 2500,
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
          <SwiperSlide key={project.id} className="max-w-[320px] md:max-w-[450px]">
            <div className="group relative bg-slate-900/80 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm">
              {/* Imagem do Projeto */}
              <div className='h-64 overflow-hidden'>
                <img 
                  src={project.imagem}
                  alt={project.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/*Contéudo*/}
              <div className='p-6'>
                <h3 className="text-2xl font-black text-white mb-2 uppercase italic">
                  {project.titulo}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6">
                  {project.descricao}
                </p>

                <div className='flex items-center justify-between'>
                  <a 
                    href={project.link_demo}
                    target='_blank'
                    rel='noreferrer'
                    className="flex items-center gap-2 text-neon-cyan font-bold text-xs uppercase tracking-tighter hover:brightness-125"
                  >
                    Ver Projeto <ExternalLink size={14} />
                  </a>

                  <button 
                    onClick={() => navigate('/projects')}
                    className="p-2 bg-white/5 rounded-full text-white hover:bg-neon-pink transition-colors"
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