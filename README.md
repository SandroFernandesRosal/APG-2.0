# APG-2.0

**APG-2.0** é uma aplicação web desenvolvida com foco em performance, acessibilidade e experiência do usuário, feita para atender às necessidades da igreja **Alcançados Pela Graça**. O projeto foi criado de forma **voluntária** com o objetivo de facilitar a comunicação, organização e divulgação de conteúdos da igreja, como notícias, testemunhos, eventos e informações institucionais.

A aplicação é baseada no framework **Next.js 15** e utiliza tecnologias modernas como TypeScript, Tailwind CSS, Prisma ORM e autenticação com NextAuth. Todo o sistema foi pensado para ser intuitivo, fácil de gerenciar e acessível tanto para membros da igreja quanto para administradores.

> 💡 O site está disponível em: [https://apg-2-0.vercel.app](https://apg-2-0.vercel.app)

---

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** – Framework React com suporte a rotas de app e API integradas  
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estática e segurança em tempo de desenvolvimento  
- **[Tailwind CSS](https://tailwindcss.com/)** – Estilização moderna com utilitários CSS  
- **[Prisma ORM](https://www.prisma.io/)** – Mapeamento objeto-relacional para bancos de dados  
- **[NextAuth.js](https://next-auth.js.org/)** – Sistema de autenticação completo para Next.js  
- **[Vercel](https://vercel.com/)** – Plataforma de deploy otimizado para Next.js  
- **[Cloudinary](https://cloudinary.com/)** – Armazenamento e otimização de imagens e vídeos  

---

## 📁 Estrutura Geral

- `/app` – Páginas e rotas da aplicação (App Router)  
- `/api` – Backend da aplicação com rotas organizadas por método e recurso  
- `/src` – Componentes reutilizáveis e lógica da interface  
- `/lib` – Utilitários e middlewares  
- `/prisma` – Schemas e migrações de banco de dados  
- `/public` – Arquivos estáticos  
- `/types` – Tipagens personalizadas  

---

## ⚙️ Funcionalidades

- 📌 Publicação de notícias e eventos por localidades (Caxias, Tomazinho, Vila da Penha)  
- 🎤 Envio de testemunhos com mídia (imagem ou vídeo)  
- 📅 Sistema de agenda da igreja  
- 👥 Cadastro de membros e líderes  
- 🔐 Área administrativa com controle de acesso por tipo de usuário (`SUPERADMIN`, `ADMIN`, `MEMBRO`)  
- 📬 Página de contato, sobre e localização  
- 🌙 Responsividade e dark mode com Tailwind CSS  

---

## 🔒 Autenticação

O sistema possui autenticação dividida por tipo de usuário:

- **Super Admin**: acesso total, único que pode criar e excluir administradores.  
- **Admin**: acesso à gestão de conteúdos.  
- **Membro**: pode enviar e editar seus próprios testemunhos.  

---

## 👨‍💻 Autor

Desenvolvido por **Sandro Fernandes Rosal**, formado em Análise e Desenvolvimento de Sistemas, com foco em desenvolvimento de aplicações web modernas com **React**, **Next.js** e tecnologias relacionadas.

> Projeto desenvolvido de forma **voluntária** para a igreja **Alcançados Pela Graça**, com o propósito de contribuir para a missão de comunicar o Evangelho com excelência também no meio digital.

- GitHub: [@SandroFernandesRosal](https://github.com/SandroFernandesRosal)  
- LinkedIn: [linkedin.com/in/sandro-rosal](https://www.linkedin.com/in/sandro-rosal)  
