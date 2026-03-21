import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative border-t border-white/5 bg-slate-950 pt-16 pb-8 px-6 shadow-[0_-10px_40px_rgba(6,182,212,0.1)]">
            
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-black text-white italic tracking-tighter">
                        EMERSON<span className="text-neon-cyan">.DEV</span>
                    </h2>
                    <p className="text-slate-500 text-sm mt-2">© 2026 Todos os direitos reservados.</p>
                </div>

                <div className="flex gap-6">
                    <a 
                        href="https://github.com/emersontlsd"
                        target='_blank'
                        rel='noopener-noreferrer'
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        <Github size={20}/>
                    </a>

                    <a 
                        href="http://linkedin.com/in/emerson-de-souza-dantas"
                        target='_blank'
                        rel='noopener-noreferrer'
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        <Linkedin size={20}/>
                    </a>

                    <a 
                        href="https://www.instagram.com/EmersonTlsd"
                        target='_blank'
                        rel='noopener-noreferrer'
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        <Instagram size={20}/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;