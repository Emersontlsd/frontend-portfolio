import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Swal from 'sweetalert2';

const Feedback = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbacks, setFeedbacks] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL; 

  const carregarFeedbacks = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/feedbacks`);
      if (!resposta.ok) throw new Error('Erro ao carregar');
      const dados = await resposta.json();
      // Garante que 'dados' seja uma lista para não quebrar o .map()
      setFeedbacks(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error("Erro ao carregar feedbacks: ", error);
    }
  };

  useEffect(() => {
    carregarFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosFormulario = {
      nome,
      mensagem,
      estrelas: rating,
      telefone
    };

    try {
      const resposta = await fetch(`${API_URL}/api/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFormulario)
      });

      if (resposta.ok) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seu feedback foi publicado.',
          icon: 'success',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#06b6d4'
        });

        setNome('');
        setTelefone('');
        setMensagem('');
        setRating(5);
        carregarFeedbacks();
      }
    } catch (error) {
      console.error("Erro ao enviar: ", error);
    }
  };

  return (
    <div className='min-h-screen pt-32 px-6 pb-20 max-w-5xl mx-auto relative z-10'>
      <h2 className='text-4xl font-black mb-12 text-center uppercase italic text-white'>
        Feedback dos <span className='text-neon-cyan'>Clientes</span>
      </h2>

      <div className='grid md:grid-cols-3 gap-8'>
        {/* Formulário de Envio */}
        <form onSubmit={handleSubmit} className='md:col-span-1 bg-slate-900/50 p-6 rounded-2xl border border-white/10 h-fit backdrop-blur-md'>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Deixe sua avaliação</h3>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Seu Nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full bg-slate-800/50 border border-white/5 rounded-lg p-3 text-white placeholder:text-slate-500 outline-none focus:ring-1 ring-neon-cyan transition-all"
            />

            <input 
              type='text'
              placeholder='Telefone (Opcional)'
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/5 rounded-lg p-3 text-white placeholder:text-slate-500 outline-none focus:ring-1 ring-neon-cyan transition-all"
            />

            <textarea 
              maxLength="200"
              placeholder='Sua mensagem (máx 200 caracteres)'
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
              className="w-full bg-slate-800/50 border border-white/5 rounded-lg p-3 text-white placeholder:text-slate-500 outline-none h-32 resize-none focus:ring-1 ring-neon-cyan transition-all"
            />

            <div className='flex flex-col items-center gap-2'>
              <span className='text-[10px] text-slate-400 uppercase'>Sua nota</span>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={22}
                    onClick={() => setRating(s)}
                    className={`${s <= rating ? "fill-neon-cyan text-neon-cyan" : "text-slate-700"} cursor-pointer hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>

            <button type='submit' className="w-full bg-neon-pink hover:brightness-110 text-white py-4 rounded-xl font-black text-xs tracking-widest shadow-[0_0_15px_rgba(255,0,229,0.2)] transition-all">
              PUBLICAR
            </button>
          </div>
        </form>

        {/* Lista de Feedbacks (Mural) */}
        <div className='md:col-span-2 space-y-6'>
          {feedbacks.length === 0 ? (
            <p className='text-slate-500 text-center italic py-10'>Nenhum feedback ainda. Seja o primeiro!</p>
          ) : (
            feedbacks.map(f => (
              <div key={f.id} className="bg-slate-800/20 p-6 rounded-2xl border border-white/5 border-l-4 border-l-neon-cyan hover:bg-slate-800/30 transition-all">
                <div className='flex justify-between items-center mb-4'>
                  <span className='font-bold text-neon-cyan text-lg tracking-tight'>{f.nome}</span>
                  <div className='flex gap-1'>
                    {[...Array(f.estrelas)].map((_, i) => (
                      <Star key={i} size={14} className='fill-white text-white' />
                    ))}
                  </div>
                </div>
                <p className='text-slate-300 leading-relaxed italic'>"{f.comentario || f.mensagem}"</p>
              </div>
            ))    
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;