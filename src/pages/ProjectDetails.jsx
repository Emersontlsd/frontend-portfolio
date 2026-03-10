import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Globe, Calendar } from 'lucide-react';

const ProjectDetails = ({ projects }) => {

    const { id } = userParams();
    const navigate = useNavigate();

    // buscar projeto pelo id
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) return <div className="pt-32 text-center">Projeto não encontrado.</div>;

    return (
        <div className='min-h-screen pt-32 px-6 pb-20'>
            <div className='max-w-4xl mx-auto'>
                <button
                    onClick={() => navigate('/')}
                    className='flex items-center gap-2 text-neon-cyan mb-8 hover:urderline'
                >
                    <ArrowLeft size={20} /> Voltar para o início
                </button>

                <div className='grid md:grid-cols-2 gap-12'>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.1)] w-full object-cover h-96"
                    />

                    <div>
                        <h1 className="text-4xl font-black mb-4 text-white uppercase tracking-tighter">
                            {project.title}
                        </h1>
                        <p className='text-slate-400 leading-relaxed mb-8'>
                            {project.description}
                        </p>

                        <div className='space-y-4'>
                            <div className='flex items-center gap-4 text-sm text-slate-300'>
                                <Cpu className='text-neon-pink' size={18} />
                                <span>Tecnologias: React, Node.js, Tailwind</span>
                            </div>
                            <div className='flex items-center gap-4 text-sm text-slate-300'>
                                <Globe className='text-neon-pink' size={18} />
                                <span>Status: Finalizado</span>
                            </div>
                            <div className='flex items-center gap-4 text-sm text-slate-300'>
                                <Calendar className='text-neon-pink' size={18} />
                                <span>Data: Março 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};// fim ProjectDetails

export default ProjectDetails;