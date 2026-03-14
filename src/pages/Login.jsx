import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // salva o token
                localStorage.setItem('token', data.token);

                // feedback de sucesso
                Swal.fire({
                    title: 'Acesso Autorizado',
                    text: `Bem vindo de volta, Emerson.`,
                    icon: 'success',
                    background: '#0f1722',
                    color: '#fff',
                    showConfirmButton: false,
                    timer: 1500
                });

                // redireciona
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                Swal.fire({
                    title: 'Erro no Login',
                    text: data.message || 'Credenciais Inválidas.',
                    icon: 'error',
                    background: '#0f172a',
                    color: '#fff'
                });
            }
        } catch (error) {
            Swal.fire('Erro!', 'Não foi possível conectar ao servidor.', 'error');
        } finally {
            setLoading(false);
        }
    }// fim handleLogin

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md">
                {/* Logo / Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black italic tracking-tighter text-white">
                        EMERSON<span className="text-cyan-400">.ADMIN</span>
                    </h1>
                    <p className="text-slate-500 text-xs uppercase tracking-[4px] mt-2">Restricted Access Area</p>
                </div>

                {/* Card de Login */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Campo Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">E-mail</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-800/40 border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:ring-1 ring-cyan-500 transition-all"
                                    placeholder="admin@email.com"
                                />
                                <Mail className="absolute left-4 top-4.5 text-slate-500" size={18} />
                            </div>
                        </div>

                        {/* Campo Senha */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-800/40 border border-white/5 rounded-2xl p-4 pl-12 pr-12 text-white outline-none focus:ring-1 ring-cyan-500 transition-all"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-4.5 text-slate-500" size={18} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4.5 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Botão Entrar */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'ACESSAR PAINEL'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-widest">
                    Authorized Personnel Only
                </p>
            </div>
        </div>
    );

} // fim Login

export default Login;