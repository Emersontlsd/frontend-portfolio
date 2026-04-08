# Frontend - Portfolio Emerson Dev

Este é o frontend do meu portfólio pessoal. Sou desenvolvedor Full Stack especializado em JavaScript (React & Node). O projeto apresenta um design moderno e responsivo, com tema escuro inspirado em espaço sideral, utilizando animações suaves e interações dinâmicas.

## 🚀 Funcionalidades

### Páginas Públicas
- **Página Inicial (Home)**: Apresentação com efeito typewriter, slider interativo de projetos em destaque, e seções sobre o desenvolvedor.
- **Lista de Projetos**: Exibe todos os projetos cadastrados em um grid responsivo, com filtros e navegação para detalhes.
- **Detalhes do Projeto**: Página individual com imagem, descrição, tecnologias utilizadas e links para repositório e demo.
- **Contato**: Formulário para orçamento de projetos ou solicitação de corrida executiva, com informações de localização e disponibilidade.
- **Feedback**: Mural público de avaliações dos clientes, com formulário para deixar comentários e estrelas.

### Área Administrativa (Dashboard)
- **Login Seguro**: Autenticação via JWT para acesso ao painel administrativo.
- **Gerenciamento de Projetos**: CRUD completo (Criar, Ler, Atualizar, Deletar) de projetos, com modal para edição.
- **Gerenciamento de Contatos**: Visualização de mensagens recebidas, marcação como lida/não lida, exclusão e detalhes expandidos.
- **Gerenciamento de Feedbacks**: Controle de avaliações públicas, com possibilidade de exclusão.
- **Busca e Filtros**: Funcionalidade de busca em tempo real em todas as tabelas.
- **Estatísticas**: Contadores de mensagens totais e não lidas no painel de contatos.

### Recursos Gerais
- **Design Responsivo**: Otimizado para desktop, tablet e mobile.
- **Animações**: Transições suaves com Framer Motion, efeitos de hover e scroll.
- **Tema Escuro**: Fundo com estrelas animadas, gradientes neon (ciano e rosa).
- **Navegação**: Navbar fixa com scroll effect, menu mobile hambúrguer.
- **SEO Básico**: Meta tags e estrutura semântica.
- **404 Personalizado**: Página de erro para rotas inexistentes.

## 🛠 Tecnologias Utilizadas

### Core
- **React 19**: Biblioteca para construção da interface.
- **Vite**: Build tool rápido para desenvolvimento e produção.
- **React Router DOM 7**: Roteamento client-side.

### Estilização
- **Tailwind CSS 4**: Framework CSS utilitário com configuração customizada (cores neonCyan e neonPink).
- **PostCSS**: Processamento de CSS.
- **Autoprefixer**: Adição automática de prefixos CSS.

### Bibliotecas de UI/Interação
- **Framer Motion**: Animações e transições.
- **Lucide React**: Ícones vetoriais.
- **Swiper**: Carrossel/slider para projetos.
- **Typewriter Effect**: Efeito de digitação no hero.
- **React Hot Toast**: Notificações (não utilizado no código atual, mas instalado).
- **SweetAlert2**: Modais de confirmação e alertas.

### Desenvolvimento
- **ESLint**: Linting com regras customizadas.
- **@vitejs/plugin-react**: Plugin Vite para React.
- **@types/react & @types/react-dom**: Tipos TypeScript (projeto em JS, mas preparado para TS).

### Backend Integração
- Conecta com API backend via fetch (endpoints: /api/projects, /api/contacts, /api/feedbacks, /api/login).
- Variável de ambiente: `VITE_API_URL` para URL da API.

## 📦 Dependências

### Produção
```json
{
  "@tailwindcss/postcss": "^4.2.1",
  "framer-motion": "^12.35.0",
  "lucide-react": "^0.577.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hot-toast": "^2.6.0",
  "react-router-dom": "^7.13.1",
  "sweetalert2": "^11.26.22",
  "swiper": "^12.1.2",
  "typewriter-effect": "^2.22.0"
}
```

### Desenvolvimento
```json
{
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "autoprefixer": "^10.4.27",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "postcss": "^8.5.8",
  "tailwindcss": "^4.2.1",
  "vite": "^7.3.1"
}
```

## 🗂 Estrutura do Projeto

```
frontend/
├── eslint.config.js          # Configuração ESLint
├── index.html                # HTML principal
├── package.json              # Dependências e scripts
├── postcss.config.js         # Configuração PostCSS
├── README.md                 # Este arquivo
├── tailwind.config.js        # Configuração Tailwind CSS
├── vercel.json               # Configuração Vercel
├── vite.config.js            # Configuração Vite
└── src/
    ├── App.jsx               # Componente raiz com roteamento
    ├── index.css             # Estilos globais
    ├── main.jsx              # Ponto de entrada React
    ├── components/
    │   ├── index.jsx         # Exportações centralizadas
    │   ├── Dashboard/        # Componentes do painel admin
    │   │   ├── ContactCard.jsx
    │   │   ├── DataTable.jsx
    │   │   └── Sidebar.jsx
    │   ├── Home/             # Componentes da página inicial
    │   │   ├── Hero.jsx
    │   │   └── ProjectSlider.jsx
    │   ├── Layout/           # Componentes de layout
    │   │   ├── BackgroundStars.css
    │   │   ├── BackgroundStars.jsx
    │   │   ├── Footer.jsx
    │   │   └── Navbar.jsx
    │   └── Shared/           # Componentes compartilhados
    │       ├── ModalProjeto.jsx
    │       └── NotFound.jsx
    ├── pages/                # Páginas da aplicação
    │   ├── Contact/
    │   │   └── index.jsx
    │   ├── Dashboard/
    │   │   └── index.jsx
    │   ├── Feedback/
    │   │   └── index.jsx
    │   ├── Home/
    │   │   └── index.jsx
    │   ├── Login/
    │   │   └── index.jsx
    │   └── Projects/
    │       ├── Details/
    │       │   └── index.jsx
    │       └── List/
    │           └── index.jsx
    └── routes/
        └── index.jsx         # Definição das rotas
```

## 🛣 Rotas e Caminhos

- `/` - Página inicial
- `/projects` - Lista de projetos
- `/projects/:id` - Detalhes de um projeto específico
- `/contact` - Página de contato
- `/feedback` - Página de feedbacks
- `/login` - Página de login administrativo
- `/dashboard` - Painel administrativo (protegido)
- `*` - Página 404

## 🚀 Como Instalar e Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend rodando (consulte o README do backend para instruções)

### Passos de Instalação

1. **Clone o repositório** (se aplicável) ou navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Crie um arquivo `.env` na raiz do frontend
   - Adicione a URL da API backend:
     ```
     VITE_API_URL=http://localhost:3000
     ```
     (Ajuste para a URL do seu backend em produção, ex: `https://backend-portfolio-emerson.vercel.app`)

4. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   - O projeto estará disponível em `http://localhost:5173` (porta padrão do Vite)

5. **Build para produção** (opcional):
   ```bash
   npm run build
   ```
   - Os arquivos otimizados serão gerados na pasta `dist`

6. **Preview da build**:
   ```bash
   npm run preview
   ```

### Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run lint` - Executa linting
- `npm run preview` - Preview da build local

### Desenvolvimento
- O projeto utiliza Hot Module Replacement (HMR) para recarregamento automático durante o desenvolvimento.
- ESLint está configurado para manter a qualidade do código.
- Tailwind CSS processa automaticamente as classes utilitárias.

### Deploy
- O projeto está configurado para deploy no Vercel (vercel.json).
- Para outros provedores, copie os arquivos da pasta `dist` após o build.

## 🔧 Configurações Importantes

### Tailwind CSS
- Cores customizadas: `neonCyan` (#00f3ff) e `neonPink` (#ff00e5)
- Configurado para purgar classes não utilizadas em produção.

### Vite
- Plugin React ativado.
- Alias configuráveis se necessário.

### ESLint
- Regras para React Hooks e refresh.
- Configurado para JavaScript moderno.

## 📱 Responsividade
- Breakpoints: mobile-first com Tailwind (sm, md, lg, xl).
- Layout adaptável em todas as páginas.
- Menu mobile com toggle.

## 🔐 Segurança
- Autenticação JWT no dashboard.
- Validação de formulários.
- Sanitização básica de inputs.

## 🎨 Design System
- Tipografia: Fontes sans-serif, pesos bold/black, maiúsculas para títulos.
- Cores: Fundo escuro (#020617), texto branco/cinza, acentos ciano/rosa.
- Espaçamento: Sistema de padding/margin consistente.
- Bordas: Arredondadas (rounded-xl, rounded-2xl, etc.).
- Sombras: Efeitos neon com box-shadow.

Este projeto demonstra habilidades em desenvolvimento frontend moderno, com foco em UX/UI, performance e manutenibilidade.
