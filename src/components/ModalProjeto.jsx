import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Tag, Globe } from 'lucide-react';
import Swal from 'sweetalert2';

const ModalProjeto = ({ isOpen, onClose, onSave, projetoParaEditar }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        imagem: '',
        link_repo: '',
        link_demo: ''
    });

    useEffect(() => {
        if (projetoParaEditar) {
            // Sanitização: Se algum campo vier null do banco, vira string vazia
            setFormData({
                id: projetoParaEditar.id,
                titulo: projetoParaEditar.titulo || '',
                descricao: projetoParaEditar.descricao || '',
                imagem: projetoParaEditar.imagem || '',
                link_repo: projetoParaEditar.link_repo || '',
                link_demo: projetoParaEditar.link_demo || ''
            });
        } else {
            setFormData({ 
                titulo: '', 
                descricao: '', 
                imagem: '', 
                link_repo: '', 
                link_demo: '' 
            });
        }
    }, [projetoParaEditar, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.titulo || !formData.descricao) {
            return Swal.fire({ 
                title: 'Erro', 
                text: 'Título e Descrição são obrigatórios!', 
                icon: 'error', 
                background: '#0f172a', 
                color: '#fff' 
            });
        }
        
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tight">
                        {projetoParaEditar ? 'Editar' : 'Novo'} <span className="text-cyan-400">Projeto</span>
                    </h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid md:grid-cols-1 gap-6">
                        
                        {/* Título */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Título do Projeto *</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={formData.titulo || ''} // Fallback para string vazia
                                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-3 pl-10 text-white outline-none focus:ring-1 ring-cyan-400 transition-all"
                                    placeholder="Ex: E-commerce App"
                                    required
                                />
                                <Tag className="absolute left-3 top-3.5 text-slate-500" size={18} />
                            </div>
                        </div>

                        {/* URL da Imagem */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">URL da Imagem</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={formData.imagem || ''} // Fallback para string vazia
                                    onChange={(e) => setFormData({...formData, imagem: e.target.value})}
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-3 pl-10 text-white outline-none focus:ring-1 ring-cyan-400 transition-all"
                                    placeholder="https://link-da-imagem.com/foto.jpg"
                                />
                                <ImageIcon className="absolute left-3 top-3.5 text-slate-500" size={18} />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Link do Repositório */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">GitHub (Repo)</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={formData.link_repo || ''} // Fallback para string vazia
                                        onChange={(e) => setFormData({...formData, link_repo: e.target.value})}
                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-3 pl-10 text-white outline-none focus:ring-1 ring-cyan-400 transition-all"
                                        placeholder="https://github.com/..."
                                    />
                                    <LinkIcon className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                </div>
                            </div>

                            {/* Link da Demo */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Live Demo (Site)</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={formData.link_demo || ''} // Fallback para string vazia
                                        onChange={(e) => setFormData({...formData, link_demo: e.target.value})}
                                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-3 pl-10 text-white outline-none focus:ring-1 ring-cyan-400 transition-all"
                                        placeholder="https://meu-projeto.vercel.app"
                                    />
                                    <Globe className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Descrição Detalhada *</label>
                            <textarea 
                                value={formData.descricao || ''} // Fallback para string vazia
                                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                                className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 text-white outline-none h-32 resize-none focus:ring-1 ring-cyan-400 transition-all"
                                placeholder="Fale sobre o projeto..."
                                required
                            />
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 bg-slate-800 text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all"
                        >
                            CANCELAR
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 bg-cyan-400 text-slate-950 py-4 rounded-2xl font-black tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={20} /> {projetoParaEditar ? 'ATUALIZAR' : 'CRIAR PROJETO'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalProjeto;