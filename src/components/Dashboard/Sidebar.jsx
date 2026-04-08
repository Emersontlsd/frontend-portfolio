import React from 'react';
import { Briefcase, MessageSquare, Mail, LogOut, X } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen, setIsOpen }) => {
    const menuItems = [
        { id: 'projects', label: 'Projetos', icon: Briefcase },
        { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
        { id: 'contacts', label: 'Mensagens', icon: Mail },
    ];

    return (
        <>
            {/* 1. OVERLAY (Fundo escuro ao abrir no mobile) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 2. ASIDE (Ajustado para ser fixo no mobile e relativo no desktop) */}
            <aside className={`
                fixed inset-y-0 left-0 z-[70] w-72 bg-slate-900 border-r border-white/5 p-8 flex flex-col justify-between
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:h-screen md:flex
            `}>
                <div>
                    {/* BOTÃO FECHAR (Apenas Mobile) */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="md:hidden absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-12">
                        <h1 className="text-2xl font-black italic tracking-tighter text-white">
                            EMERSON<span className="text-cyan-400">.ADMIN</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[3px] mt-1">Control Panel v2.0</p>
                    </div>

                    <nav className="space-y-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsOpen(false); // Fecha o menu ao clicar
                                }}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${
                                    activeTab === item.id
                                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <button 
                    onClick={onLogout} 
                    className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors font-bold text-sm px-5 group mb-4 md:mb-0"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    Sair do Painel
                </button>
            </aside>
        </>
    );
};

export default Sidebar;