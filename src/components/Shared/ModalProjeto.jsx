import React, { useState, useEffect } from 'react';
import { X, Save, Code2, Plus } from 'lucide-react';

const ModalProjeto = ({ isOpen, onClose, onSave, projetoParaEditar }) => {
    const [tagInput, setTagInput] = useState('');

    // Estado inicial do formulário
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        imagem: '',
        link_repo: '',
        link_demo: '',
        tecnologias: '' 
    });

    // Sincroniza os dados ao abrir para editar ou criar novo
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

    // Lógica para Adicionar Tag
    const addTag = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim().replace(',', '');
            
            // Pega as tags atuais transformando a string em array
            const tagsAtuais = formData.tecnologias 
                ? formData.tecnologias.split(',').map(t => t.trim()).filter(t => t !== "") 
                : [];

            if (newTag && !tagsAtuais.includes(newTag)) {
                const novasTagsArray = [...tagsAtuais, newTag];
                setFormData({ ...formData, tecnologias: novasTagsArray.join(', ') });
            }
            setTagInput('');
        }
    };

    // Lógica para Remover Tag
    const removeTag = (tagParaRemover) => {
        const novasTags = formData.tecnologias
            .split(',')
            .map(t => t.trim())
            .filter(t => t !== tagParaRemover)
            .join(', ');
        setFormData({ ...formData, tecnologias: novasTags });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                
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

                        {/* CAMPO: TECNOLOGIAS (Tags Inteligentes) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                                <Code2 size={12} className="text-cyan-400" /> Tecnologias (Enter para add)
                            </label>
                            <div className="flex flex-wrap gap-2 p-2 bg-slate-950 border border-white/10 rounded-xl min-h-[50px] items-center focus-within:border-cyan-500 transition-all">
                                {formData.tecnologias && formData.tecnologias.split(',').map((tech, idx) => (
                                    tech.trim() !== "" && (
                                        <span key={idx} className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-lg text-[10px] font-bold border border-cyan-500/20 flex items-center gap-1 uppercase tracking-tighter">
                                            {tech.trim()}
                                            <button type="button" onClick={() => removeTag(tech.trim())} className="hover:text-white text-cyan-700">
                                                <X size={12} strokeWidth={3} />
                                            </button>
                                        </span>
                                    )
                                ))}
                                <input 
                                    type="text"
                                    className="bg-transparent border-none outline-none text-white text-sm flex-1 min-w-[80px] ml-2"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    placeholder={!formData.tecnologias ? "React, Node..." : ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">URL da Imagem (Capa)</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                value={formData.imagem}
                                onChange={(e) => setFormData({...formData, imagem: e.target.value})}
                                placeholder="https://imagem.com/foto.jpg"
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

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Descrição Detalhada</label>
                        <textarea 
                            rows="3"
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all resize-none"
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-[0.2em] shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                    >
                        <Save size={18} /> {projetoParaEditar ? 'Atualizar Projeto' : 'Publicar Projeto'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalProjeto;