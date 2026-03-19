import React from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';

const DataTable = ({ data, activeTab, onEdit, onDelete }) => {
    return (
        <div className="bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-white/[0.02] border-b border-white/5">
                    <tr>
                        <th className="px-8 py-5 text-[10px] uppercase text-slate-500 font-black tracking-widest">Informações</th>
                        <th className="px-8 py-5 text-[10px] uppercase text-slate-500 font-black tracking-widest">Resumo</th>
                        <th className="px-8 py-5 text-[10px] uppercase text-slate-500 font-black text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                            <td className="px-8 py-6">
                                <span className="text-white font-bold block leading-none mb-2">{item.titulo || item.nome}</span>
                                <span className="text-slate-500 text-[9px] flex items-center gap-1 uppercase font-black">
                                    <Calendar size={10} /> {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                </span>
                            </td>
                            <td className="px-8 py-6">
                                <p className="text-slate-400 text-xs italic line-clamp-2 max-w-xs">
                                    "{item.descricao || item.comentario || item.mensagem}"
                                </p>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                    {activeTab === 'projects' && (
                                        <button onClick={() => onEdit(item)} className="p-3 rounded-xl bg-slate-800 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                                            <Edit size={16} />
                                        </button>
                                    )}
                                    <button onClick={() => onDelete(item.id)} className="p-3 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;