import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // URL centralizada para evitar erros de deploy (Vercel)
    const API_URL = import.meta.env.VITE_API_URL || 'https://backend-portifolio-iota.vercel.app';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects`);
                
                // Verificação de segurança para o erro "Unexpected token T" (página 404 da Vercel)
                if (!response.ok) throw new Error('Erro ao buscar dados do servidor');

                const data = await response.json();
                
                // Garante que o estado seja sempre um Array para evitar erro no .map()
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
                <div className="text-neon-cyan animate-pulse italic font-black uppercase tracking-widest">
                    Carregando Galáxia de Projetos...
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen pt-32 px-6 pb-20 relative z-10'>
            <h2 className='text-4xl font-black text-center mb-12 uppercase italic text-white tracking-tighter'>
                Todos os <span className='text-neon-cyan shadow-neon-cyan'>Projetos</span>
            </h2>

            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {projects.length === 0 ? (
                    <div className="col-span-3 text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-white/10">
                        <p className="text-slate-500 italic">Nenhum projeto encontrado no banco de dados.</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className='group bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500'>
                            
                            {/* Container da Imagem com Efeito Zoom */}
                            <div className="relative overflow-hidden h-48">
                                <img 
                                    src={project.imagem} 
                                    alt={project.titulo} 
                                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className='p-6'>
                                <h3 className='text-xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors'>
                                    {project.titulo}
                                </h3>
                                <p className='text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed'>
                                    {project.descricao || "Sem descrição disponível para este projeto."}
                                </p>

                                <div className='flex gap-6 border-t border-white/5 pt-4'>
                                    <a 
                                        href={project.link_repo} 
                                        target='_blank' 
                                        rel='noreferrer' 
                                        className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-neon-pink transition-colors'
                                    >
                                        <Github size={14} /> Repositório
                                    </a> 
                                    <a 
                                        href={project.link_demo} 
                                        target='_blank' 
                                        rel='noreferrer' 
                                        className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-neon-cyan transition-colors'
                                    >
                                        <ExternalLink size={14} /> Ver Live
                                    </a> 
                                </div>
                            </div>
                        </div> 
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectList;