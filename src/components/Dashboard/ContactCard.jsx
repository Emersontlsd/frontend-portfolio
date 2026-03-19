import React from 'react';
import { User, Mail, Phone, Hash, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

const ContactCard = ({ item, onVerDetalhes, onDelete, onToggleRead }) => {
    const rawPhone = item.telefone ? item.telefone.replace(/\D/g, '') : '';
    const whatsappLink = rawPhone ? `https://api.whatsapp.com/send?phone=${rawPhone}&text=Olá ${item.nome}, vi sua mensagem no meu portfólio!` : null;

    const isRead = item.lido === true;

    return (
        <div className={`relative flex flex-col justify-between p-6 rounded-[2rem] border transition-all duration-300 group 
            ${isRead 
                ? 'bg-slate-900/40 border-white/5 opacity-80' 
                : 'bg-slate-900/90 border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            }`}>
            
            {/* INDICADOR DE STATUS (Sutil) */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
                {!isRead ? (
                    <>
                        <span className="text-[9px] text-cyan-400 font-black tracking-[0.2em] uppercase opacity-70">Nova</span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                    </>
                ) : (
                    <span className="text-[9px] text-slate-600 font-black tracking-[0.2em] uppercase">Lida</span>
                )}
            </div>

            <div>
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all 
                        ${isRead ? 'bg-slate-800/50 text-slate-600 border-transparent' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                        <User size={20} />
                    </div>
                    <div>
                        <h3 className={`font-bold text-base leading-none transition-colors ${isRead ? 'text-slate-500' : 'text-white'}`}>
                            {item.nome}
                        </h3>
                        <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider mt-1 block">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recente'}
                        </span>
                    </div>
                </div>

                {/* INFO PILLS */}
                <div className="grid grid-cols-1 gap-1.5 mb-5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/30 p-2 rounded-xl border border-white/5">
                        <Mail size={12} className="text-cyan-500/50" /> <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/30 p-2 rounded-xl border border-white/5">
                        <Hash size={12} className="text-pink-500/50" /> <span className="truncate">{item.assunto || 'Serviço Geral'}</span>
                    </div>
                </div>

                {/* MENSAGEM */}
                <p className={`text-sm line-clamp-2 mb-6 p-4 rounded-2xl border border-transparent transition-all
                    ${isRead ? 'bg-transparent text-slate-500 italic' : 'bg-white/5 text-slate-300'}`}>
                    "{item.mensagem || item.comentario}"
                </p>
            </div>

            {/* AÇÕES */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button 
                    onClick={() => {
                        onVerDetalhes(item);
                        if(!isRead) onToggleRead(item.id, true);
                    }} 
                    className="flex-1 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 py-3 rounded-xl font-black text-[9px] tracking-[0.1em] transition-all uppercase flex items-center justify-center gap-2"
                >
                    <ExternalLink size={12} /> Abrir
                </button>

                <button 
                    onClick={() => onToggleRead(item.id, !isRead)}
                    className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-white/5 transition-all"
                    title={isRead ? "Marcar como não lido" : "Marcar como lido"}
                >
                    {isRead ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                {whatsappLink && (
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
                        <Phone size={16} />
                    </a>
                )}

                <button onClick={() => onDelete(item.id)} 
                    className="w-10 h-10 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default ContactCard;