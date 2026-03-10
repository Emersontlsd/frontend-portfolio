import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import Swal from 'sweetalert2'; // Adicionado para alertas profissionais

const Contact = () => {
    const [formData, setFormData] = useState({ nome: '', email: '', assunto: '', mensagem: '' });
    const [isSending, setIsSending] = useState(false); // Estado para o botão de loading

    // URL centralizada para evitar o erro de 'undefined'
    const API_URL = import.meta.env.VITE_API_URL || 'https://backend-portifolio-iota.vercel.app';

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
                setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
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
            <h2 className="text-4xl font-black mb-12 text-center uppercase italic text-white">
                Entre em <span className="text-neon-pink">Contato</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Informações de Contato */}
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-slate-900 border border-neon-cyan/30 rounded-2xl text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">E-mail</h4>
                            <p className="text-slate-400">emersontlsd@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-slate-900 border border-neon-pink/30 rounded-2xl text-neon-pink shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">WhatsApp</h4>
                            <p className="text-slate-400">+55 (61) 98285-8372</p>
                        </div>
                    </div>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md space-y-4 shadow-2xl">
                    <input
                        type="text" placeholder="Seu Nome" required
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 text-white outline-none focus:ring-1 ring-neon-cyan transition-all"
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        value={formData.nome}
                    />
                    <input
                        type="email" placeholder="Seu E-mail" required
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 text-white outline-none focus:ring-1 ring-neon-cyan transition-all"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email}
                    />
                    <input
                        type="text" placeholder="Assunto" required
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 text-white outline-none focus:ring-1 ring-neon-cyan transition-all"
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        value={formData.assunto}
                    />
                    <textarea
                        placeholder="Sua Mensagem" required 
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl p-4 text-white h-32 outline-none focus:ring-1 ring-neon-cyan resize-none transition-all"
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        value={formData.mensagem}
                    />
                    <button 
                        disabled={isSending}
                        className={`w-full bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.3)]'}`}
                    >
                        {isSending ? 'ENVIANDO...' : 'ENVIAR AGORA'} <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;