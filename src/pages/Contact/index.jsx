import React, { useState } from 'react';
import { Mail, Phone, Send, Code, Car, MessageSquare, User, Hash, MapPin, Clock } from 'lucide-react';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({ 
        nome: '', 
        email: '', 
        telefone: '', 
        assunto: '', 
        mensagem: '' 
    });
    const [isSending, setIsSending] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const res = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                Swal.fire({
                    title: 'Mensagem Enviada!',
                    text: 'Em breve entrarei em contato com você.',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#06b6d4'
                });
                setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
            } else {
                throw new Error('Falha no servidor');
            }
        } catch (err) {
            console.error("Erro ao enviar contato:", err);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível enviar sua mensagem agora.',
                icon: 'error',
                background: '#0f172a',
                color: '#fff'
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 px-6 pb-20 max-w-6xl mx-auto relative z-10">
            {/* Cabeçalho */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic text-white tracking-tighter">
                    Vamos tirar sua <span className="text-neon-cyan">Ideia</span> do <span className="text-neon-pink">Papel?</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Seja para desenvolver um sistema robusto ou para uma viagem com conforto e pontualidade, estou à disposição para superar suas expectativas.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                
                {/* Lado Esquerdo: Serviços e Infos de Localização */}
                <div className="space-y-8">
                    
                    {/* Card Orçamento App */}
                    <div className="p-6 bg-slate-900/40 border border-neon-cyan/20 rounded-3xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <Code className="text-neon-cyan" size={32} />
                            <h3 className="text-xl font-bold text-white">Orçamento de Projetos</h3>
                        </div>
                        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                            Gostaria de fazer um orçamento para uma aplicação exclusiva? Do design à implementação, eu transformo sua necessidade em software de alta performance.
                        </p>
                        <div className="flex items-center gap-3 text-slate-300">
                            <Mail size={18} className="text-neon-cyan" />
                            <span>emersontlsd@gmail.com</span>
                        </div>
                    </div>

                    {/* Card Corrida Executiva */}
                    <div className="p-6 bg-slate-900/40 border border-neon-pink/20 rounded-3xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <Car className="text-neon-pink" size={32} />
                            <h3 className="text-xl font-bold text-white">Corrida Executiva</h3>
                        </div>
                        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                            Transporte com segurança e conforto premium. Solicite sua corrida executiva agendada diretamente pelo WhatsApp.
                        </p>
                        <a 
                            href="https://wa.me/5561982858372?text=Olá Emerson, gostaria de solicitar uma corrida executiva."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-neon-pink font-bold hover:underline transition-all"
                        >
                            <Phone size={18} /> Agendar via WhatsApp
                        </a>
                    </div>

                    {/* Cards de Status (Localização e Disponibilidade) */}
                    <div className="grid grid-cols-2 gap-4">
                         <div className="p-5 bg-slate-900/80 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-neon-cyan/50 transition-colors">
                            <MapPin size={20} className="text-neon-cyan mb-2 group-hover:animate-bounce" />
                            <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Localização</span>
                            <span className="text-white font-bold text-sm">Brasília - DF</span>
                         </div>
                         <div className="p-5 bg-slate-900/80 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-neon-pink/50 transition-colors">
                            <Clock size={20} className="text-neon-pink mb-2" />
                            <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Disponibilidade</span>
                            <span className="text-white font-bold text-sm">24h / Agendado</span>
                         </div>
                    </div>
                </div>

                {/* Lado Direito: Formulário com Telefone */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <form onSubmit={handleSubmit} className="relative bg-slate-900 p-8 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
                        <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
                            <MessageSquare size={16} className="text-neon-cyan" /> Briefing Rápido
                        </div>

                        {/* Nome */}
                        <div className="relative">
                            <input
                                type="text" placeholder="Seu Nome Completo" required
                                className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:ring-1 ring-neon-cyan transition-all"
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                value={formData.nome}
                            />
                            <User className="absolute left-4 top-4 text-slate-500" size={18} />
                        </div>

                        {/* Grid E-mail e Telefone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type="email" placeholder="E-mail" required
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:ring-1 ring-neon-cyan transition-all"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    value={formData.email}
                                />
                                <Mail className="absolute left-4 top-4 text-slate-500" size={18} />
                            </div>
                            <div className="relative">
                                <input
                                    type="tel" placeholder="WhatsApp" required
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:ring-1 ring-neon-cyan transition-all"
                                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                    value={formData.telefone}
                                />
                                <Phone className="absolute left-4 top-4 text-slate-500" size={18} />
                            </div>
                        </div>

                        {/* Assunto */}
                        <div className="relative">
                            <select 
                                required
                                className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:ring-1 ring-neon-cyan transition-all appearance-none"
                                onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                                value={formData.assunto}
                            >
                                <option value="" disabled className="bg-slate-900">Como posso te ajudar?</option>
                                <option value="Orçamento App" className="bg-slate-900">Quero um orçamento de App/Site</option>
                                <option value="Corrida Executiva" className="bg-slate-900">Solicitar Corrida Executiva</option>
                                <option value="Feedback" className="bg-slate-900">Dar um Feedback</option>
                                <option value="Outros" className="bg-slate-900">Outros Assuntos</option>
                            </select>
                            <Hash className="absolute left-4 top-4 text-slate-500" size={18} />
                        </div>

                        {/* Mensagem */}
                        <textarea
                            placeholder="Conte-me um pouco mais sobre o que você precisa..." required 
                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 text-white h-32 outline-none focus:ring-1 ring-neon-cyan resize-none transition-all"
                            onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                            value={formData.mensagem}
                        />

                        <button 
                            disabled={isSending}
                            className={`w-full bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95'}`}
                        >
                            {isSending ? 'ENVIANDO...' : 'INICIAR PROJETO'} <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;