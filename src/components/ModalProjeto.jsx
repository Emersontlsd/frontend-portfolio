import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Code2, AlignLeft } from 'lucide-react';

const ModalProjeto = ({ isOpen, onClose, onSave, projetoParaEditar }) => {
    // Estado inicial do formulário
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        imagem: '',
        link_repo: '',
        link_demo: '',
        tecnologias: '' 
    });

    // Efeito para carregar dados quando for EDITAR
    useEffect(() => {
        if (projetoParaEditar) {
            setFormData(projetoParaEditar);
        } else {
            setFormData({
                titulo: '',
                descricao: '',
                imagem: '',
                link_repo: '',
                link_demo: '',
                tecnologias: ''
            });
        }
    }, [projetoParaEditar, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Envia os dados para o Dashboard
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl">
                
                {/* Header do Modal */}
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">
                        {projetoParaEditar ? 'Editar' : 'Novo'} <span className="text-cyan-400">Projeto</span>
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    
                    {/* Grid de Inputs Curtos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Título do Projeto</label>
                            <input 
                                type="text"
                                required
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                value={formData.titulo}
                                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                placeholder="Ex: E-commerce App"
                            />
                        </div>

                        {/* CAMPO: TECNOLOGIAS */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                                <Code2 size={12} className="text-cyan-400" /> Tecnologias (Separadas por vírgula)
                            </label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                value={formData.tecnologias}
                                onChange={(e) => setFormData({...formData, tecnologias: e.target.value})}
                                placeholder="React, Node, Tailwind..."
                            />
                        </div>
                    </div>

                    {/* Inputs de Links e Imagem */}
                    <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">URL da Imagem (Capa)</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                value={formData.imagem}
                                onChange={(e) => setFormData({...formData, imagem: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 italic">Link GitHub</label>
                                <input 
                                    type="text"
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                    value={formData.link_repo}
                                    onChange={(e) => setFormData({...formData, link_repo: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 italic">Link Demo (Live)</label>
                                <input 
                                    type="text"
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                    value={formData.link_demo}
                                    onChange={(e) => setFormData({...formData, link_demo: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Descrição Detalhada</label>
                        <textarea 
                            rows="4"
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all resize-none"
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        ></textarea>
                    </div>

                    {/* Botão de Salvar */}
                    <button 
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-[0.2em] shadow-lg shadow-cyan-500/20"
                    >
                        <Save size={18} /> {projetoParaEditar ? 'Atualizar Projeto' : 'Publicar Projeto'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalProjeto;