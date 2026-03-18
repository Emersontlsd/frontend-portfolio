import React, { useEffect, useState } from 'react';
import { Trash2, Edit, Plus, MessageSquare, Briefcase, Mail, LogOut, Loader2, Phone, Eye, Calendar, Hash } from 'lucide-react';
import Swal from 'sweetalert2';
import ModalProjeto from '../components/ModalProjeto';

const Dashboard = () => {
    console.log("DASHBOARD ESTÁ VIVO!");
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/${activeTab}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) return handleLogout();

            const result = await response.json();
            setData(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            setIsAuthorized(true);
            fetchData();
        }
    }, [activeTab]);

    // Função para ver detalhes completos da mensagem/contato
    const handleVerDetalhes = (item) => {
        Swal.fire({
            title: `<span class="text-cyan-400 font-black">DETALHES DO CONTATO</span>`,
            html: `
                <div class="text-left space-y-4 text-slate-300">
                    <p><strong>Cliente:</strong> ${item.nome}</p>
                    <p><strong>E-mail:</strong> ${item.email}</p>
                    <p><strong>Telefone:</strong> ${item.telefone || 'Não informado'}</p>
                    <p><strong>Serviço:</strong> <span class="text-pink-500">${item.assunto || 'Geral'}</span></p>
                    <div class="bg-slate-800 p-4 rounded-xl border border-white/5 mt-4">
                        <strong>Mensagem:</strong><br/>
                        <p class="mt-2 italic text-slate-400">"${item.mensagem || item.comentario}"</p>
                    </div>
                </div>
            `,
            background: '#0f172a',
            confirmButtonColor: '#06b6d4',
            confirmButtonText: 'Entendido'
        });
    };

    const handleSaveProject = async (projeto) => {
        const token = localStorage.getItem('token');
        try {
            const method = projeto.id ? 'PUT' : 'POST';
            const url = projeto.id ? `${API_URL}/api/projects?id=${projeto.id}` : `${API_URL}/api/projects`;
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(projeto)
            });
            if (res.status === 401) return handleLogout();
            if (res.ok) {
                Swal.fire({ title: 'Sucesso!', icon: 'success', background: '#0f172a', color: '#fff' });
                setIsModalOpen(false);
                fetchData();
            }
        } catch (error) {
            Swal.fire('Erro!', 'Não foi possível salvar.', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Excluir registro?',
            text: 'Essa ação é irreversível!',
            icon: 'warning',
            showCancelButton: true,
            background: '#0f172a',
            color: '#fff',
            confirmButtonColor: '#ef4444'
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/api/${activeTab}?id=${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    Swal.fire({ title: 'Excluído!', icon: 'success', background: '#0f172a', color: '#fff' });
                    fetchData();
                }
            } catch (error) {
                Swal.fire('Erro!', 'Erro ao deletar.', 'error');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="text-cyan-500 animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans">
            {/* SIDEBAR */}
            <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 p-8 flex flex-col justify-between hidden md:flex">
                <div>
                    <div className="mb-12">
                        <h1 className="text-2xl font-black italic tracking-tighter text-white">
                            EMERSON<span className="text-cyan-400">.ADMIN</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[3px] mt-1">Control Panel v2.0</p>
                    </div>
                    <nav className="space-y-3">
                        {[
                            { id: 'projects', label: 'Projetos', icon: Briefcase },
                            { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
                            { id: 'contacts', label: 'Mensagens', icon: Mail },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === item.id
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
                <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors font-bold text-sm px-5">
                    <LogOut size={18} /> Sair
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">
                            Gerenciar <span className="text-cyan-400">
                                {activeTab === 'projects' ? 'Projetos' : activeTab === 'contacts' ? 'Mensagens' : 'Feedbacks'}
                            </span>
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">Dados recebidos via formulários do site.</p>
                    </div>

                    {activeTab === 'projects' && (
                        <button onClick={() => { setProjetoSelecionado(null); setIsModalOpen(true); }} className="bg-cyan-400 text-slate-950 px-6 py-3 rounded-full font-black text-xs tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <Plus size={18} strokeWidth={3} /> NOVO PROJETO
                        </button>
                    )}
                </header>

                <div className="bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-500 font-black">Informações</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-500 font-black">Detalhes do Lead</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-500 font-black text-right">Gerenciar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {loading ? (
                                    <tr><td colSpan="3" className="px-8 py-20 text-center"><Loader2 className="animate-spin inline text-cyan-400" /></td></tr>
                                ) : data.length === 0 ? (
                                    <tr><td colSpan="3" className="px-8 py-20 text-center text-slate-600 uppercase font-bold tracking-tighter">Nenhum registro encontrado.</td></tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                                            {/* COLUNA 1: NOME / TITULO */}
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-slate-800 items-center justify-center text-cyan-400 font-black border border-white/5">
                                                        {(item.nome || item.titulo || "?")[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-bold text-lg block">{item.titulo || item.nome}</span>
                                                        <span className="text-slate-500 text-[10px] flex items-center gap-1 uppercase font-bold tracking-wider">
                                                            <Calendar size={12} /> {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Sem data'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* COLUNA 2: DADOS DE CONTATO OU DESCRIÇÃO */}
                                            <td className="px-8 py-6">
                                                {activeTab === 'contacts' ? (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-cyan-400 text-xs font-bold flex items-center gap-2"><Mail size={12}/> {item.email}</span>
                                                        <span className="text-pink-500 text-xs font-bold flex items-center gap-2"><Phone size={12}/> {item.telefone || 'Sem fone'}</span>
                                                        <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest bg-white/5 w-fit px-2 py-0.5 rounded italic">
                                                            {item.assunto || 'Interesse Geral'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <p className="text-slate-400 text-sm line-clamp-2 italic max-w-sm">
                                                        "{item.descricao || item.mensagem || item.comentario}"
                                                    </p>
                                                )}
                                            </td>

                                            {/* COLUNA 3: AÇÕES */}
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {activeTab === 'contacts' && (
                                                        <button onClick={() => handleVerDetalhes(item)} className="p-3 rounded-xl bg-slate-800 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all">
                                                            <Eye size={18} />
                                                        </button>
                                                    )}
                                                    {activeTab === 'projects' && (
                                                        <button onClick={() => { setProjetoSelecionado(item); setIsModalOpen(true); }} className="p-3 rounded-xl bg-slate-800 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                                                            <Edit size={18} />
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDelete(item.id)} className="p-3 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-all">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <ModalProjeto 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onSave={handleSaveProject}
              projetoParaEditar={projetoSelecionado}
            />
        </div>
    );
};

export default Dashboard;