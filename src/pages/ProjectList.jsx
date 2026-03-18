import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importação necessária para navegação
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects`);
                if (!response.ok) throw new Error('Erro ao buscar dados do servidor');
                const data = await response.json();
                setProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao carregar projetos. ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [API_URL]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="text-cyan-500 animate-pulse italic font-black uppercase tracking-[0.3em] text-xs">
                    Carregando Projetos...
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen pt-32 px-6 pb-20 relative z-10'>
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <span className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-2">Portfolio</span>
                    <h2 className='text-5xl font-black uppercase italic text-white tracking-tighter leading-none'>
                        Todos os <span className='text-cyan-500'>Projetos</span>
                    </h2>
                </header>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {projects.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                            <p className="text-slate-500 italic">Nenhum projeto encontrado.</p>
                        </div>
                    ) : (
                        projects.map(project => (
                            <div key={project.id} className='group relative flex flex-col bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500'>
                                
                                {/* Link que envolve a imagem e o título para abrir os detalhes */}
                                <Link to={`/projects/${project.id}`} className="block overflow-hidden relative aspect-video">
                                    <img 
                                        src={project.imagem} 
                                        alt={project.titulo} 
                                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110' 
                                    />
                                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </Link>

                                <div className='p-8 flex flex-col flex-1'>
                                    <Link to={`/projects/${project.id}`}>
                                        <h3 className='text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight'>
                                            {project.titulo}
                                        </h3>
                                    </Link>
                                    
                                    <p className='text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed font-light'>
                                        {project.descricao || "Sem descrição disponível."}
                                    </p>

                                    {/* Links Externos (Rodapé do Card) */}
                                    <div className='mt-auto flex items-center justify-between border-t border-white/5 pt-6'>
                                        <div className="flex gap-4">
                                            <a 
                                                href={project.link_repo} 
                                                target='_blank' 
                                                rel='noreferrer' 
                                                className='p-2 text-slate-500 hover:text-white transition-colors'
                                                title="GitHub"
                                            >
                                                <Github size={18} />
                                            </a> 
                                            <a 
                                                href={project.link_demo} 
                                                target='_blank' 
                                                rel='noreferrer' 
                                                className='p-2 text-slate-500 hover:text-cyan-400 transition-colors'
                                                title="Live Demo"
                                            >
                                                <ExternalLink size={18} />
                                            </a> 
                                        </div>
                                        
                                        <Link 
                                            to={`/projects/${project.id}`} 
                                            className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                        >
                                            Ver Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div> 
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;