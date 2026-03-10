import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ProjectList = () => {
    //estado para guardar os projetos que vem da api
    const [ projects, setProjects ] = useState([]);
    
    const [ loading, setLoading ] = useState(true);

    // buscar os dados assim que o componente aparecer na tela
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Erro ao carregar projetos. ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if(loading) {
        return <div className="min-h-screen pt-40 text-center text-white italic">Carregando seus projetos...</div>;
    }

    return (
        <div className='min-h-screen pt-32 px-6 pb-20'>
            <h2 className='text-4xl font-black text-center mb-12 uppercase italic text-white '>
                Todos os <span className='text-neon-cyan'>Projetos</span>
            </h2>

            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {projects.length === 0 ? (
                    <p className="text-slate-500 col-span-3 text-center">Nenhum projeto encontrado no banco.</p>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className='bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-neon-cyan/50 transition-all '>
                            {/* project.image como no banco */}
                            <img src={project.imagem} alt={project.titulo} className='h-48 w-full object-cover' />

                            <div className='p-6'>
                                <h3 className='text-xl font-bold mb-2'>{project.titulo}</h3>
                                <p className='text-slate-400 text-sm mb-4 line-clamp-3'>{project.descricao}</p>

                                <div className='flex gap-4'>
                                     <a href={project.link_repo} target='_blank' rel='noreferrer' className='flex items-center gap-1 text-xs text-neon-pink hover:underline'>
                                   <Github size={14} />Repo 
                                </a> 
                                <a href={project.link_demo} target='_blank' rel='noreferrer' className='flex items-center gap-1 text-xs text-neon-pink hover:underline'>
                                   <ExternalLink size={14} />Live Demo 
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