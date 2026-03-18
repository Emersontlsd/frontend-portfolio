import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Code2, Info } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects?id=${id}`);
                if (!response.ok) throw new Error('Projeto não encontrado');
                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
        window.scrollTo(0, 0);
    }, [id, API_URL]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617]">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
    );

    if (!project) return (
        <div className="min-h-screen pt-40 text-center text-white bg-[#020617]">
            <p className="text-slate-500 italic">Projeto não localizado.</p>
            <button onClick={() => navigate('/')} className="text-cyan-500 underline mt-4 text-sm">Voltar ao início</button>
        </div>
    );

    return (
        <div className='min-h-screen bg-[#020617] text-slate-300 pb-32 font-sans'>
            
            {/* Removi a navbar interna que estava dando conflito.
               O PT-40 (padding top) garante que o título apareça ABAIXO da sua navbar principal.
            */}
            <div className='max-w-4xl mx-auto px-6 pt-40'>
                
                {/* BOTÃO VOLTAR SOLTO NO LAYOUT */}
                <button 
                    onClick={() => navigate(-1)} 
                    className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 transition-all mb-12'
                >
                    <ArrowLeft size={14} /> Voltar para Projetos
                </button>

                {/* TÍTULO E BOTÕES */}
                <div className="mb-12">
                    <span className="text-cyan-500 font-black text-[9px] uppercase tracking-[0.4em] mb-3 block">Detalhes do Projeto</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-8">
                        {project.titulo}
                    </h1>
                    
                    <div className="flex flex-wrap gap-3">
                        <a href={project.link_demo} target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2">
                            Acessar Projeto <ExternalLink size={14} />
                        </a>
                        <a href={project.link_repo} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2">
                            Ver Código <Github size={14} />
                        </a>
                    </div>
                </div>

                {/* IMAGEM PRINCIPAL */}
                <div className="relative mb-20">
                    <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                        <img src={project.imagem} alt={project.titulo} className="w-full h-auto object-cover" />
                    </div>
                </div>

                {/* CONTEÚDO */}
                <div className="space-y-20">
                    
                    {/* Descrição */}
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-8">
                            <Info size={18} className="text-cyan-500" />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Sobre o projeto</h3>
                        </div>
                        <p className="text-slate-400 text-xl leading-relaxed font-light whitespace-pre-line">
                            {project.descricao}
                        </p>
                    </div>

                    {/* Tecnologias */}
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-10">
                            <Code2 size={20} className="text-cyan-500" />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Tecnologias Utilizadas</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            {project.tecnologias ? project.tecnologias.split(',').map((tech, index) => (
                                <span key={index} className="px-5 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold text-cyan-400 uppercase tracking-widest">
                                    {tech.trim()}
                                </span>
                            )) : (
                                <span className="text-slate-600 italic text-sm">Nenhuma tecnologia listada.</span>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;