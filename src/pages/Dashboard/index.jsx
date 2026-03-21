import React, { useEffect, useState } from 'react';
import { Plus, Loader2, Menu } from 'lucide-react';
import Swal from 'sweetalert2';

// Importação dos Componentes Modulares
import Sidebar from '../../components/Dashboard/Sidebar';
import ContactCard from '../../components/Dashboard/ContactCard';
import DataTable from '../../components/Dashboard/DataTable';
import ModalProjeto from '../../components/Shared/ModalProjeto';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    // --- LÓGICA DE DADOS ---
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
            console.error("Erro:", error);
            setData([]);
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
            setSearchTerm('');
            fetchData();
        }
    }, [activeTab]);

    const filteredData = data.filter(item => {
        const searchStr = searchTerm.toLowerCase().trim();
        if (!searchStr) return true;
        return Object.values(item).some(val => val && val.toString().toLowerCase().includes(searchStr));
    });

    // --- HANDLERS ---
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleToggleRead = async (id, novoStatus) => {
        const token = localStorage.getItem('token');

        // Otimismo: Atualiza na tela antes mesmo de ir ao banco
        setData(prev => prev.map(item => item.id === id ? { ...item, lido: novoStatus } : item));

        try {
            // Ajustado para usar a query string ?id= conforme sua API
            const response = await fetch(`${API_URL}/api/contacts?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lido: novoStatus }),
            });

            if (!response.ok) throw new Error('Falha ao atualizar no servidor');

            // CORREÇÃO: Usando setData (que é seu estado real) em vez de setContacts
            setData(prev => prev.map(item =>
                item.id === id ? { ...item, lido: novoStatus } : item
            ));

        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar o status da mensagem.',
                icon: 'error',
                background: '#0f172a',
                color: '#fff'
            });
        }
    };

    const handleSaveProject = async (projeto) => {
        const token = localStorage.getItem('token');
        try {
            const method = projeto.id ? 'PUT' : 'POST';
            const url = projeto.id ? `${API_URL}/api/projects?id=${projeto.id}` : `${API_URL}/api/projects`;
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(projeto)
            });
            if (res.ok) {
                Swal.fire({ title: 'Sucesso!', icon: 'success', background: '#0f172a', color: '#fff' });
                setIsModalOpen(false);
                fetchData();
            }
        } catch (error) { Swal.fire('Erro!', 'Falha ao salvar.', 'error'); }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Excluir?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            background: '#0f172a',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${API_URL}/api/${activeTab}?id=${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setData(prev => prev.filter(item => item.id !== id));
                    Swal.fire({ title: 'Excluído!', icon: 'success', background: '#0f172a', color: '#fff', timer: 1500, showConfirmButton: false });
                }
            } catch (error) { console.error(error); }
        }
    };

    const handleVerDetalhes = (item) => {
        // Marca como lido automaticamente ao abrir, se ainda não estiver lido
        if (activeTab === 'contacts' && !item.lido) {
            handleToggleRead(item.id, true);
        }

        Swal.fire({
            title: `<span class="text-cyan-400 font-black italic">MENSAGEM DE ${item.nome?.toUpperCase()}</span>`,
            html: `
                <div class="text-left text-slate-300 p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <p class="text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold">Conteúdo:</p>
                    <p class="text-slate-300 leading-relaxed italic">"${item.mensagem || item.comentario}"</p>
                </div>
            `,
            background: '#0f172a',
            confirmButtonColor: '#06b6d4',
            confirmButtonText: 'FECHAR'
        });
    };

    if (!isAuthorized) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="text-cyan-500 animate-spin" size={48} /></div>;

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans">

            {/* Botão Hamburguer*/}
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden fixed top-6 left-6 z-50 bg-cyan-400 text-slate-950 p-2 rounded-xl shadow-lg shadow-cyan-400/20"
            >
                <Menu size={24} strokeWidth={3} />
            </button>

            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={handleLogout} 
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">
                            Gerenciar <span className="text-cyan-400">{activeTab === 'projects' ? 'Projetos' : activeTab === 'contacts' ? 'Mensagens' : 'Feedbacks'}</span>
                        </h2>
                        <p className="text-slate-500 text-sm mt-2 font-medium">
                            {loading ? 'Sincronizando...' : `Exibindo ${filteredData.length} registros.`}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                        <input
                            type="text" placeholder="Buscar..."
                            className="w-full md:w-80 bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:border-cyan-400 outline-none transition-all shadow-inner"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {activeTab === 'projects' && (
                            <button onClick={() => { setProjetoSelecionado(null); setIsModalOpen(true); }} className="bg-cyan-400 text-slate-950 px-6 py-3 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                                <Plus size={18} strokeWidth={3} /> NOVO PROJETO
                            </button>
                        )}
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
                        <Loader2 className="animate-spin text-cyan-400" size={40} />
                        <span className="font-bold tracking-widest text-xs uppercase">Carregando...</span>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="bg-slate-900/40 rounded-3xl border border-dashed border-white/10 p-20 text-center text-slate-500 italic font-bold">
                        Nenhum registro encontrado.
                    </div>
                ) : activeTab === 'contacts' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredData.map(item => (
                            <ContactCard
                                key={item.id}
                                item={item}
                                onVerDetalhes={handleVerDetalhes}
                                onDelete={handleDelete}
                                onToggleRead={handleToggleRead}
                            />
                        ))}
                    </div>
                ) : (
                    <DataTable
                        data={filteredData}
                        activeTab={activeTab}
                        onEdit={(item) => { setProjetoSelecionado(item); setIsModalOpen(true); }}
                        onDelete={handleDelete}
                    />
                )}
            </main>

            <ModalProjeto
                isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProject} projetoParaEditar={projetoSelecionado}
            />
        </div>
    );
};

export default Dashboard;