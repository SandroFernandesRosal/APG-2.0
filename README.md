# APG 2.0 - Sistema Completo da Igreja Alcançados pela Graça

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
- [API Routes](#api-routes)
- [Componentes](#componentes)
- [Sistema de Toast](#sistema-de-toast)
- [Deploy](#deploy)

## 🎯 Visão Geral

O **APG 2.0** é um sistema completo de gerenciamento para a Igreja Alcançados pela Graça, desenvolvido com Next.js 14, TypeScript e Prisma. O sistema oferece funcionalidades avançadas para administração de igrejas, gerenciamento de conteúdo, sistema de Bíblia digital e muito mais.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- **Login/Logout** com JWT
- **Registro de usuários** com diferentes níveis de acesso
- **Recuperação de senha** via email
- **Perfis de usuário** com avatares
- **Controle de acesso** baseado em roles (SUPERADMIN, ADMIN, MEMBRO)

### 🏛️ Gerenciamento de Igrejas
- **3 Igrejas**: Vila da Penha, Tomazinho, Vila Maria Helena
- **Administração independente** para cada igreja
- **Sistema de roles** específicos por igreja
- **Dashboard personalizado** para cada local

### 📰 Sistema de Conteúdo
- **Notícias** com suporte a imagens e vídeos
- **Testemunhos** com aprovação administrativa
- **Páginas institucionais** (Quem Somos, Ministérios)
- **Upload de mídia** com preview
- **Sistema de destaque** para conteúdo importante

### 📖 Bíblia Digital Completa
- **Bíblia completa** em português (66 livros)
- **API externa** integrada (bible-api.com)
- **Tradução automática** para português
- **Sistema de favoritos** para versículos
- **Plano de leitura** personalizado
- **Marcação de versículos lidos**
- **Navegação intuitiva** por livros e capítulos
- **Busca rápida** por livros populares
- **Interface responsiva** para mobile e desktop

### 🎨 Interface e UX
- **Tema claro/escuro** automático
- **Design responsivo** para todos os dispositivos
- **Animações suaves** e transições
- **Sistema de toast** personalizado
- **Modais de confirmação** para ações importantes
- **Loading states** e feedback visual

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones modernos
- **React Icons** - Biblioteca de ícones
- **React Hot Toast** → **React-Toastify** - Notificações

### Backend
- **Next.js API Routes** - API serverless
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados principal
- **JWT** - Autenticação e autorização
- **bcrypt** - Hash de senhas

### Infraestrutura
- **Vercel** - Deploy e hosting
- **PostgreSQL** - Banco de dados (Vercel Postgres)
- **Cloudinary** - Upload de imagens

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/APG-2.0.git
cd APG-2.0
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
APG-2.0/
├── src/
│   ├── app/
│   │   ├── (pages)/           # Páginas públicas
│   │   │   ├── admin/         # Área administrativa
│   │   │   ├── agenda/        # Sistema de agenda
│   │   │   ├── biblia/        # Bíblia digital
│   │   │   ├── doacao/        # Sistema de doações
│   │   │   ├── enderecos/     # Endereços das igrejas
│   │   │   ├── login/         # Autenticação
│   │   │   ├── ministerio/    # Ministérios
│   │   │   ├── noticias/      # Notícias
│   │   │   ├── perfil/        # Perfil do usuário
│   │   │   ├── quemsomos/     # Página institucional
│   │   │   ├── register/      # Registro
│   │   │   ├── search/        # Busca
│   │   │   └── testemunhos/   # Testemunhos
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Autenticação
│   │   │   ├── bible/         # Bíblia digital
│   │   │   ├── news/          # Notícias
│   │   │   ├── testemunhos/   # Testemunhos
│   │   │   └── upload/        # Upload de arquivos
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes React
│   │   ├── crud/              # Componentes CRUD
│   │   ├── skeleton/          # Loading skeletons
│   │   └── ...                # Outros componentes
│   ├── data/                  # Tipos TypeScript
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilitários
│   └── store/                 # Estado global
├── prisma/                    # Schema do banco
├── public/                    # Arquivos estáticos
└── ...
```

## 🔧 Funcionalidades Detalhadas

### 📖 Bíblia Digital

#### Características Principais
- **66 livros** da Bíblia completa
- **Navegação intuitiva** por livros e capítulos
- **Sistema de favoritos** para versículos
- **Plano de leitura** personalizado
- **Marcação de progresso** (versículos lidos)
- **Busca rápida** por livros populares
- **Interface responsiva**

#### Componentes da Bíblia
- `BibliaNavigation` - Navegação entre livros/capítulos
- `VerseDisplay` - Exibição de versículos
- `BibliaSearch` - Busca rápida
- `BibliaFavorites` - Gerenciamento de favoritos
- `BibliaReadingPlan` - Plano de leitura

#### Funcionalidades Avançadas
- **Favoritar versículos** com botão de estrela
- **Marcar como lido** com botão de check
- **Reset de dados** (favoritos e leitura)
- **Paginação** para favoritos
- **Progresso visual** do plano de leitura
- **Cálculo automático** de metas diárias

### 🔐 Sistema de Autenticação

#### Níveis de Acesso
- **SUPERADMIN**: Acesso total ao sistema
- **ADMIN**: Administração da igreja específica
- **MEMBRO**: Acesso básico ao conteúdo

#### Funcionalidades
- **Login/Logout** com JWT
- **Registro** com validação
- **Recuperação de senha** via email
- **Perfil editável** com avatar
- **Controle de sessão**

### 📰 Sistema de Conteúdo

#### Notícias
- **CRUD completo** para notícias
- **Suporte a imagens e vídeos**
- **Sistema de destaque**
- **Paginação**
- **Busca e filtros**

#### Testemunhos
- **Submissão** por membros
- **Aprovação** administrativa
- **Moderação** de conteúdo
- **Sistema de roles**

### 🏛️ Gerenciamento de Igrejas

#### Estrutura
- **Vila da Penha** - Igreja principal
- **Tomazinho** - Igreja secundária
- **Vila Maria Helena** - Igreja terceira

#### Funcionalidades
- **Administração independente**
- **Conteúdo específico** por igreja
- **Usuários vinculados** a igrejas
- **Dashboard personalizado**

## 🔌 API Routes

### Autenticação (`/api/auth/`)
- `POST /login` - Login de usuário
- `POST /register` - Registro de usuário
- `POST /logout` - Logout
- `POST /recover-password` - Recuperação de senha
- `PUT /reset-password` - Reset de senha
- `GET /me` - Dados do usuário logado

### Bíblia (`/api/bible/`)
- `GET /` - Buscar versículos
- `GET /favorites` - Listar favoritos
- `POST /favorites` - Adicionar favorito
- `DELETE /favorites` - Remover favorito
- `GET /read-verses` - Versículos lidos
- `POST /read-verses` - Marcar como lido
- `GET /read-chapters` - Capítulos lidos
- `POST /read-chapters` - Marcar capítulo como lido
- `GET /reading-plan` - Plano de leitura
- `POST /reading-plan` - Criar plano de leitura
- `POST /reset-favorites` - Reset de favoritos
- `POST /reset-reading` - Reset de leitura

### Conteúdo
- `GET /api/news` - Listar notícias
- `POST /api/news` - Criar notícia
- `PUT /api/news/[id]` - Editar notícia
- `DELETE /api/news/[id]` - Deletar notícia
- `GET /api/testemunhos` - Listar testemunhos
- `POST /api/testemunhos` - Criar testemunho
- `DELETE /api/testemunhos/[id]` - Deletar testemunho

### Upload
- `POST /api/upload` - Upload de arquivos

## 🧩 Componentes Principais

### Componentes da Bíblia
- `BibliaNavigation` - Navegação entre livros/capítulos
- `VerseDisplay` - Exibição de versículos com controles
- `BibliaSearch` - Busca rápida por livros
- `BibliaFavorites` - Gerenciamento de favoritos com paginação
- `BibliaReadingPlan` - Plano de leitura com progresso

### Componentes CRUD
- `AddNew` - Adicionar notícias
- `EditNew` - Editar notícias
- `AddTestemunho` - Adicionar testemunhos
- `AddMinisterio` - Adicionar ministérios
- `EditUser` - Editar perfil de usuário

### Componentes de Interface
- `Header` - Cabeçalho com navegação
- `Footer` - Rodapé
- `NavBar` - Navegação mobile
- `ConfirmModal` - Modal de confirmação
- `ChangeTheme` - Toggle de tema

## 🎨 Sistema de Toast

### Implementação
- **React-Toastify** para notificações
- **Cores personalizadas** para cada tipo
- **Suporte a tema claro/escuro**
- **Barra de progresso** visual
- **Posicionamento** no canto superior direito

### Tipos de Toast
- **Success** - Verde (sucesso)
- **Error** - Vermelho (erro)
- **Warning** - Amarelo (aviso)
- **Info** - Azul (informação)

### Cores Personalizadas
```css
/* Success Toast */
.custom-toast[data-type="success"] {
  background-color: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #065f46 !important;
}

/* Dark Theme */
[data-theme="dark"] .custom-toast[data-type="success"] {
  background-color: rgba(6, 95, 70, 0.2) !important;
  border-color: #047857 !important;
  color: #a7f3d0 !important;
}
```

### Uso nos Componentes
```typescript
import { toast } from 'react-toastify'

// Sucesso
toast.success('Operação realizada com sucesso!')

// Erro
toast.error('Ocorreu um erro na operação!')

// Aviso
toast.warning('Atenção: Esta ação requer confirmação!')

// Informação
toast.info('Informação importante para você!')
```

## 🚀 Deploy

### Vercel
1. **Conecte o repositório** ao Vercel
2. **Configure as variáveis de ambiente**
3. **Configure o banco PostgreSQL**
4. **Execute o deploy**

### Variáveis de Ambiente
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="https://seu-dominio.vercel.app"
```

### Banco de Dados
- **Vercel Postgres** recomendado
- **Migrations** executadas automaticamente
- **Prisma** configurado para produção

## 📊 Banco de Dados

### Principais Tabelas
- `User` - Usuários do sistema
- `BibleFavorite` - Versículos favoritados
- `BibleReadVerse` - Versículos lidos
- `BibleReadChapter` - Capítulos lidos
- `BibleReadingPlan` - Planos de leitura
- `News` - Notícias
- `Testemunho` - Testemunhos
- `Ministerio` - Ministérios
- `AuditLog` - Log de auditoria

### Relacionamentos
- Usuários vinculados a igrejas
- Favoritos e leitura vinculados a usuários
- Conteúdo organizado por igreja

## 🔒 Segurança

### Autenticação
- **JWT** para sessões
- **bcrypt** para hash de senhas
- **Middleware** de autenticação
- **Controle de acesso** baseado em roles

### Validação
- **Validação de entrada** em todas as APIs
- **Sanitização** de dados
- **Rate limiting** para APIs críticas
- **Logs de auditoria** para ações importantes

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Componentes Responsivos
- **Header** com menu mobile
- **Navegação** adaptativa
- **Formulários** otimizados para touch
- **Bíblia** com interface mobile-friendly

## 🎯 Próximas Funcionalidades

### Planejadas
- **Sistema de eventos** com calendário
- **Chat interno** para membros
- **Sistema de doações** online
- **App mobile** nativo
- **Integração** com redes sociais
- **Analytics** e relatórios
- **Sistema de notificações** push

### Melhorias
- **Performance** otimizada
- **SEO** aprimorado
- **Acessibilidade** melhorada
- **Testes** automatizados
- **Documentação** expandida

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o repositório
2. **Crie** uma branch para sua feature
3. **Desenvolva** a funcionalidade
4. **Teste** adequadamente
5. **Submeta** um Pull Request

### Padrões de Código
- **TypeScript** para tipagem
- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits** para commits

## 📞 Suporte

### Contato
- **Email**: suporte@apg.com
- **Telefone**: (21) 99999-9999
- **WhatsApp**: (21) 99999-9999

### Documentação
- **Wiki**: [Link para wiki]
- **API Docs**: [Link para documentação da API]
- **Guia de Deploy**: [Link para guia]

---

**APG 2.0** - Sistema Completo da Igreja Alcançados pela Graça  
Desenvolvido com ❤️ para a comunidade cristã
