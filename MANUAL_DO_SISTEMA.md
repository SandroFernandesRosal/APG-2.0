# Manual do Sistema APG 2.0
## Guia Completo para Usuários

---

## 📋 Índice

1. [Introdução](#introdução)
2. [Tipos de Usuários](#tipos-de-usuários)
3. [Manual do Superadmin](#manual-do-superadmin)
4. [Manual do Admin](#manual-do-admin)
5. [Manual do Membro](#manual-do-membro)
6. [Funcionalidades Gerais](#funcionalidades-gerais)
7. [Dúvidas Frequentes](#dúvidas-frequentes)

---

## Introdução

Bem-vindo ao sistema APG 2.0! Este manual foi criado para ajudar você a entender e usar todas as funcionalidades do sistema de forma simples e prática.

O sistema foi desenvolvido para gerenciar o conteúdo e as atividades da Igreja Alcançados pela Graça, permitindo que diferentes pessoas trabalhem juntas de forma organizada.

---

## Tipos de Usuários

O sistema possui três tipos de usuários, cada um com permissões diferentes:

### 🔴 Superadmin
- **Quem é**: A pessoa responsável por gerenciar todo o sistema
- **O que pode fazer**: Acesso completo a todas as funcionalidades, incluindo gerenciar igrejas, criar administradores e visualizar histórico de atividades

### 🟡 Admin
- **Quem é**: Administrador de uma igreja específica
- **O que pode fazer**: Gerenciar o conteúdo da sua igreja (notícias, eventos, ministérios, testemunhos) e usuários da sua igreja

### 🟢 Membro
- **Quem é**: Qualquer pessoa cadastrada no sistema
- **O que pode fazer**: Visualizar conteúdo, enviar testemunhos e usar a Bíblia digital

---

# Manual do Superadmin

## O que é um Superadmin?

O Superadmin é a pessoa que tem controle total sobre o sistema. É responsável por gerenciar todas as igrejas cadastradas e criar novos administradores.

## Como Acessar

1. Faça login no sistema com suas credenciais de Superadmin
2. Após o login, você verá um menu com opções especiais disponíveis apenas para você

## Funcionalidades Disponíveis

### 1. Gerenciar Igrejas

**Onde encontrar**: Menu → **Igrejas** (ou acesse `/admin/igrejas`)

**O que você pode fazer**:

- **Criar uma nova igreja**
  - Clique no botão "Nova Igreja"
  - Preencha as informações:
    - Nome da igreja (obrigatório)
    - Tipo (ex: Filial, Matriz)
    - Endereço completo
    - Descrição
    - Informações bancárias (banco, conta, agência, titular)
    - Chave PIX e nome do beneficiário
    - Contatos (telefone, WhatsApp, Facebook, YouTube, Instagram)
  - Marque se a igreja está ativa ou não
  - Clique em "Salvar"

- **Editar uma igreja existente**
  - Na lista de igrejas, clique no ícone de lápis ao lado da igreja
  - Faça as alterações necessárias
  - Clique em "Salvar"

- **Visualizar página da igreja**
  - Clique no ícone de olho para ver como a página da igreja aparece para os visitantes

- **Desativar ou deletar uma igreja**
  - Você só pode deletar uma igreja se ela não tiver usuários, notícias, ministérios, eventos ou testemunhos vinculados
  - Se houver conteúdo vinculado, você verá uma mensagem informando o que precisa ser removido primeiro

### 2. Gerenciar Usuários

**Onde encontrar**: Menu → **Usuários** (ou acesse `/usuarios`)

**O que você pode fazer**:

- **Visualizar todos os usuários**
  - Veja uma lista completa de todos os usuários cadastrados no sistema
  - Use os filtros para encontrar usuários específicos:
    - Por igreja
    - Por cargo (Pastor, Diácono, Presbítero, etc.)
    - Por função (Admin ou Membro)

- **Editar informações de um usuário**
  - Clique no ícone de lápis ao lado do usuário
  - Você pode alterar:
    - Nome
    - Cargos (Pastor, Diácono, Presbítero, Evangelista, Missionário, Secretário, Tesoureiro, Pastor Presidente, Pastor Dirigente, Músico, Auxiliar)
    - Igreja vinculada
    - Função (Admin ou Membro)
  - Clique em "Salvar"

- **Estatísticas**
  - Veja quantos usuários existem no total
  - Quantos pastores, diáconos, etc.

### 3. Criar Novos Usuários e Administradores

**Onde encontrar**: Menu → **Perfil** → Botão "Criar novo administrador"

**Como criar um novo administrador**:

1. Clique no botão "Criar novo administrador"
2. Preencha o formulário:
   - Nome completo
   - Email (login)
   - Senha (mínimo 8 caracteres, máximo 10, deve conter letras e pelo menos um caractere especial)
   - Foto (opcional - clique para fazer upload)
   - Selecione a igreja que ele administrará (obrigatório)
3. Clique em "Criar"
4. O novo usuário será criado como Admin da igreja selecionada
5. Se você quiser que ele apareça como líder na página de Ministérios, vá em **Usuários** e adicione cargos a ele

**Como tornar um usuário existente em administrador**:

Você também pode transformar um usuário que já existe no sistema em administrador:

1. Vá em Menu → **Usuários**
2. Na lista de usuários, encontre o usuário que deseja tornar administrador
3. Clique no ícone de lápis ao lado do campo "Tipo"
4. No menu suspenso, selecione "Administrador"
5. Clique em "Salvar"
6. O usuário agora é um Admin e terá acesso às funcionalidades administrativas

**Importante**: 
- Apenas Superadmins podem criar novos administradores ou alterar a função de usuários existentes
- Membros podem se registrar sozinhos através da página de registro, mas serão criados como MEMBRO por padrão
- Após criar um usuário ou alterar sua função, você pode adicionar cargos a ele na página de Usuários para que ele apareça como líder

### 4. Visualizar Histórico de Atividades

**Onde encontrar**: Menu → **Histórico** (ou acesse `/admin/historico`)

**O que você pode ver**:

- Todas as ações realizadas no sistema
- Quem fez cada ação
- Quando foi feita
- O que foi alterado

**Filtros disponíveis**:
- Por tipo de ação (criar, editar, deletar)
- Por tipo de conteúdo (notícia, usuário, igreja, etc.)
- Por usuário
- Por data (período específico)

**Estatísticas**:
- Veja gráficos mostrando as ações mais comuns
- Entenda quais tipos de conteúdo são mais gerenciados

### 5. Todas as Funcionalidades de Admin

Como Superadmin, você também tem acesso a todas as funcionalidades que um Admin tem (veja seção "Manual do Admin" abaixo).

---

# Manual do Admin

## O que é um Admin?

O Admin é o administrador de uma igreja específica. Ele é responsável por gerenciar todo o conteúdo relacionado à sua igreja.

## Como Acessar

1. Faça login no sistema com suas credenciais de Admin
2. Você verá um menu com opções de administração

## Funcionalidades Disponíveis

### 1. Gerenciar Notícias

**Onde encontrar**: Menu → **Notícias** (ou acesse `/noticias`)

**O que você pode fazer**:

- **Criar uma nova notícia**
  - Clique no botão "Adicionar Notícia"
  - Preencha:
    - Título da notícia
    - Conteúdo (texto completo)
    - Imagem de capa (opcional, mas recomendado)
    - Link de vídeo do YouTube (opcional)
    - Marque se deseja destacar a notícia
  - Clique em "Salvar"

- **Editar uma notícia**
  - Na página de usuários, encontre a notícia que deseja editar
  - Clique no ícone de lápis
  - Faça as alterações
  - Clique em "Salvar"

- **Deletar uma notícia**
  - Na página de usuários, encontre a notícia
  - Clique no ícone de lixeira
  - Confirme a exclusão

**Dica**: Notícias em destaque aparecem primeiro na lista e têm maior visibilidade.

### 2. Gerenciar Eventos (Agenda)

**Onde encontrar**: Menu → **Agenda** (ou acesse `/agenda`)

**O que você pode fazer**:

- **Criar um novo evento**
  - Clique no botão "Adicionar evento"
  - Preencha:
    - Título do evento
    - Descrição
    - Data e hora de início
    - Data e hora de término
    - Local do evento
    - Selecione a igreja relacionada
  - Clique em "Salvar"

- **Editar um evento**
  - Na página de usuários, encontre o evento
  - Clique no ícone de lápis
  - Faça as alterações
  - Clique em "Salvar"

- **Deletar um evento**
  - Na página de usuários, encontre o evento
  - Clique no ícone de lixeira
  - Confirme a exclusão

**Importante**: Os eventos aparecem na agenda pública e ajudam os membros a saberem o que está acontecendo na igreja.

### 3. Gerenciar Ministérios (Líderes)

**Onde encontrar**: Menu → **Ministério** (ou acesse `/ministerio`)

**Como funciona**: Os ministérios são formados por líderes (usuários com cargos específicos). Quando você atribui um cargo a um usuário, ele automaticamente aparece como líder na página de ministérios.

**O que você pode fazer**:

- **Adicionar um líder existente ao ministério**
  - Na página de Ministérios, clique no botão "Adicionar Líder"
  - Você será redirecionado para a página de Usuários
  - Na lista de usuários, encontre o usuário que deseja tornar líder
  - Clique no ícone de lápis ao lado do campo "Cargo"
  - Selecione os cargos que deseja atribuir ao usuário (você pode selecionar múltiplos)
  - Os cargos disponíveis são: Pastor, Diácono, Presbítero, Evangelista, Missionário, Secretário, Tesoureiro, Pastor Presidente, Pastor Dirigente, Músico, Auxiliar
  - Clique em "Salvar"
  - O usuário aparecerá automaticamente na página de Ministérios

- **Criar um novo usuário para ser líder** (apenas Superadmin)
  - Vá em **Perfil** → Clique em "Criar novo administrador"
  - Preencha o formulário:
    - Nome completo
    - Email (login)
    - Senha
    - Foto (opcional)
    - Selecione a igreja
  - Clique em "Criar"
  - Depois, vá em **Usuários** e adicione os cargos a esse novo usuário (veja instruções acima)

- **Editar um líder**
  - Na página de Ministérios, encontre o card do líder que deseja editar
  - Clique no ícone de lápis (no canto superior direito do card)
  - Um formulário aparecerá onde você pode:
    - Alterar os cargos do líder
    - Alterar a igreja vinculada (apenas Superadmin)
  - Clique em "Salvar" para confirmar

- **Remover um líder**
  - Na página de Ministérios, encontre o card do líder que deseja remover
  - Clique no ícone de lixeira (no canto superior direito do card)
  - Confirme a exclusão
  - **Importante**: Isso remove o líder do ministério, mas não deleta o usuário do sistema

**Importante**: A página de Usuários não permite criar novos usuários, apenas editar usuários existentes. Para criar novos usuários, você precisa ser Superadmin e usar a opção "Criar novo administrador" na página de Perfil.

### 4. Aprovar Testemunhos

**Onde encontrar**: Menu → **Testemunhos** (ou acesse `/testemunhos`)

**O que você pode fazer**:

- **Visualizar testemunhos pendentes**
  - Os testemunhos enviados por membros aparecem primeiro para aprovação
  - Você verá o conteúdo do testemunho e quem enviou

- **Aprovar um testemunho**
  - Clique no botão "Aprovar" ao lado do testemunho
  - O testemunho será publicado e ficará visível para todos

- **Rejeitar um testemunho**
  - Clique no botão "Rejeitar" ou "Deletar"
  - O testemunho será removido e não será publicado

**Importante**: Testemunhos precisam ser aprovados antes de aparecerem publicamente. Isso garante que apenas conteúdo apropriado seja publicado.

### 5. Gerenciar Usuários da Sua Igreja

**Onde encontrar**: Menu → **Usuários** (ou acesse `/usuarios`)

**O que você pode fazer**:

- **Visualizar usuários da sua igreja**
  - Veja uma lista de todos os usuários vinculados à sua igreja
  - Use filtros para encontrar usuários específicos:
    - Por igreja
    - Por cargo (Pastor, Diácono, etc.)

- **Editar cargos de um usuário**
  - Na lista de usuários, encontre o usuário desejado
  - Clique no ícone de lápis ao lado do campo "Cargo"
  - Um modal aparecerá com checkboxes de todos os cargos disponíveis
  - Marque os cargos que deseja atribuir ao usuário (você pode selecionar múltiplos)
  - Clique em "Salvar"

- **Editar igreja de um usuário** (apenas Superadmin)
  - Na lista de usuários, encontre o usuário desejado
  - Clique no ícone de lápis ao lado do campo "Igreja"
  - Selecione a nova igreja no menu suspenso
  - Clique em "Salvar"

- **Editar função de um usuário** (apenas Superadmin)
  - Na lista de usuários, encontre o usuário desejado
  - Clique no ícone de lápis ao lado do campo "Tipo"
  - Selecione a nova função (Admin ou Membro)
  - Clique em "Salvar"

- **Estatísticas da sua igreja**
  - Veja quantos membros sua igreja tem
  - Quantos pastores, diáconos, presbíteros, etc.
  - Quantos usuários sem cargo
  - Quantos usuários sem igreja

**Limitações**: 
- Você só pode gerenciar usuários da sua própria igreja. Não pode ver ou editar usuários de outras igrejas.
- **Não é possível criar novos usuários nesta página**. Para criar novos usuários, você precisa ser Superadmin e usar a opção "Criar novo administrador" na página de Perfil.

### 6. Visualizar Página da Sua Igreja

**Onde encontrar**: Menu → **Igrejas** → Clique no ícone de olho

Você pode ver como a página da sua igreja aparece para os visitantes, mas não pode editar as informações da igreja (apenas Superadmin pode fazer isso).

---

# Manual do Membro

## O que é um Membro?

Um Membro é qualquer pessoa cadastrada no sistema. Membros podem visualizar conteúdo, usar a Bíblia digital e enviar testemunhos.

## Como Acessar

1. Faça login no sistema com suas credenciais
2. Você verá o menu principal com todas as opções disponíveis

## Funcionalidades Disponíveis

### 1. Visualizar Notícias

**Onde encontrar**: Menu → **Notícias** (ou acesse `/noticias`)

**O que você pode fazer**:

- Ver todas as notícias publicadas
- Filtrar notícias por igreja usando o seletor no topo
- Ler notícias completas clicando nelas
- Ver imagens e vídeos das notícias

**Você não pode**: Criar, editar ou deletar notícias (apenas Admins podem fazer isso).

### 2. Visualizar Agenda de Eventos

**Onde encontrar**: Menu → **Agenda** (ou acesse `/agenda`)

**O que você pode fazer**:

- Ver todos os eventos programados
- Filtrar eventos por igreja
- Ver detalhes de cada evento (data, hora, local, descrição)

**Você não pode**: Criar, editar ou deletar eventos (apenas Admins podem fazer isso).

### 3. Visualizar Ministérios

**Onde encontrar**: Menu → **Ministério** (ou acesse `/ministerio`)

**O que você pode fazer**:

- Ver todos os ministérios da igreja
- Ver informações sobre cada ministério
- Ver quem são os líderes de cada ministério

### 4. Enviar Testemunhos

**Onde encontrar**: Menu → **Testemunhos** (ou acesse `/testemunhos`)

**O que você pode fazer**:

- **Enviar um testemunho**
  - Clique no botão "Enviar Testemunho" ou "Adicionar Testemunho"
  - Escreva seu testemunho
  - Clique em "Enviar"

**Importante**: 
- Seu testemunho será enviado para aprovação
- Um Admin precisa aprovar antes que ele apareça publicamente
- Isso pode levar algum tempo

- **Visualizar testemunhos aprovados**
  - Veja todos os testemunhos que foram aprovados e publicados
  - Testemunhos aparecem em ordem cronológica

**Você não pode**: Aprovar ou rejeitar testemunhos (apenas Admins podem fazer isso).

### 5. Usar a Bíblia Digital

**Onde encontrar**: Menu → **Bíblia** (ou acesse `/biblia`)

**O que você pode fazer**:

- **Ler a Bíblia completa**
  - Selecione um livro da Bíblia
  - Selecione um capítulo
  - Os versículos aparecerão automaticamente
  - Use as setas para navegar entre capítulos

- **Favoritar versículos**
  - Clique na estrela ao lado de um versículo
  - O versículo será salvo nos seus favoritos
  - Acesse seus favoritos na seção "Favoritos" no topo da página

- **Marcar versículos como lidos**
  - Clique no check ao lado de um versículo
  - O sistema marca que você já leu aquele versículo
  - Isso ajuda a acompanhar seu progresso de leitura

- **Criar um plano de leitura**
  - Na seção "Plano de Leitura", clique em "Criar Plano"
  - Escolha quantos dias você quer para ler a Bíblia toda
  - O sistema calculará automaticamente quantos capítulos você precisa ler por dia
  - Acompanhe seu progresso na barra de progresso

- **Buscar livros rapidamente**
  - Use a busca rápida para encontrar livros populares
  - Digite o nome do livro ou selecione da lista

- **Ver seus favoritos**
  - Todos os versículos que você favoritou aparecem na seção "Favoritos"
  - Você pode remover favoritos clicando na estrela novamente

- **Resetar dados**
  - Se quiser começar do zero, você pode resetar:
    - Seus favoritos
    - Seu progresso de leitura
    - Seu plano de leitura

### 6. Visualizar Informações das Igrejas

**Onde encontrar**: Menu → **Igrejas** (ou acesse `/igrejas`)

**O que você pode fazer**:

- Ver informações sobre todas as igrejas cadastradas
- Ver endereços e contatos
- Ver informações de doação (PIX, conta bancária)
- Ver links para redes sociais

### 7. Ver Informações de Doação

**Onde encontrar**: Menu → **Doação** (ou acesse `/doacao`)

**O que você pode fazer**:

- Ver informações bancárias para fazer doações
- Ver chaves PIX
- Ver contas bancárias de cada igreja

### 8. Ver Página "Quem Somos"

**Onde encontrar**: Menu → **Quem Somos** (ou acesse `/quemsomos`)

**O que você pode fazer**:

- Ler informações sobre a igreja
- Ver líderes e pastores
- Conhecer a história da igreja

### 9. Gerenciar Seu Perfil

**Onde encontrar**: Menu → **Perfil** (ou acesse `/perfil`)

**O que você pode fazer**:

- Ver suas informações pessoais
- Editar seu nome
- Alterar sua foto de perfil (avatar)
- Alterar sua senha

**Você não pode**: Alterar seu cargo ou função (apenas Admins podem fazer isso).

---

# Funcionalidades Gerais

## Funcionalidades Disponíveis para Todos

### 1. Busca

**Onde encontrar**: Menu de busca no topo da página

**O que você pode fazer**:

- Buscar por qualquer conteúdo no sistema
- Encontrar notícias, eventos, ministérios, etc.
- Digite o que procura e pressione Enter

### 2. Alternar Tema (Claro/Escuro)

**Onde encontrar**: Menu → Botão de tema (ícone de sol/lua)

**O que você pode fazer**:

- Alternar entre tema claro e escuro
- O tema escolhido é salvo e será usado na próxima vez que você acessar

### 3. Notificações

**Onde encontrar**: Ícone de sino no topo da página

**O que você pode fazer**:

- Ver notificações do sistema
- Ver avisos importantes

### 4. Logout (Sair)

**Onde encontrar**: Menu → Botão "Sair" ou ícone de logout

**O que você pode fazer**:

- Sair da sua conta
- É importante fazer logout quando usar computadores compartilhados

---

# Dúvidas Frequentes

## Perguntas Gerais

### Como faço para criar uma conta?

Qualquer pessoa pode criar uma conta no sistema! Basta seguir estes passos:

1. Acesse a página de **Registro** (você pode encontrar o link na página de login ou acessar diretamente `/register`)
2. Preencha o formulário:
   - Seu nome completo
   - Seu email (será usado como login)
   - Crie uma senha (mínimo 8 caracteres, máximo 10, deve conter letras e pelo menos um caractere especial)
   - Foto de perfil (opcional - clique para fazer upload)
   - Selecione uma igreja (opcional - você pode escolher "Nenhuma / Não sou membro" se não pertencer a nenhuma igreja)
3. Clique em "Cadastrar"
4. Após o cadastro, você será redirecionado para a página de login
5. Faça login com seu email e senha

**Importante**: 
- Ao se registrar, você será criado como **Membro** por padrão
- A seleção de igreja é opcional - você pode deixar em "Nenhuma" se não pertencer a nenhuma igreja específica
- Se você não selecionar uma igreja, um Admin ou Superadmin pode atribuir você a uma igreja depois
- Apenas Superadmins podem criar contas de Administrador através da opção "Criar novo administrador" na página de Perfil

### Esqueci minha senha. O que fazer?

1. Na tela de login, clique em "Esqueci minha senha"
2. Digite seu email ou login
3. Você receberá um email com instruções para redefinir sua senha
4. Siga as instruções do email

### Posso alterar minha senha?

Sim! Vá em **Perfil** → **Alterar Senha** e siga as instruções.

### Por que não consigo ver certas opções no menu?

As opções disponíveis dependem do seu tipo de usuário:
- **Membros** veem apenas opções de visualização
- **Admins** veem opções de administração da sua igreja
- **Superadmins** veem todas as opções

### Como sei qual é o meu tipo de usuário?

Vá em **Perfil** e você verá sua função (Membro, Admin ou Superadmin).

## Perguntas sobre Notícias

### Quantas imagens posso adicionar em uma notícia?

Você pode adicionar **apenas uma imagem de capa** por notícia. O sistema não permite adicionar imagens dentro do texto da notícia - apenas uma imagem de capa ou um vídeo.

**Tamanhos ideais para a imagem de capa:**

Para que a imagem fique perfeita no destaque da página inicial, use estas especificações:

- **Largura mínima**: 1920 pixels (largura de telas grandes)
- **Altura mínima**: 700 pixels (altura máxima no desktop)
- **Proporção recomendada**: 16:9 (por exemplo, 1920x1080 pixels)
- **Formato**: JPG ou PNG
- **Tamanho máximo do arquivo**: 10MB

**Dica**: Imagens muito pequenas podem ficar pixeladas ou cortadas quando exibidas em telas grandes. Use sempre imagens de alta qualidade para garantir uma boa aparência em todos os dispositivos.

### Posso adicionar vídeos nas notícias?

Sim! Você pode adicionar um vídeo fazendo upload do arquivo. Formatos aceitos: MP4, MOV. Tamanho máximo: 10MB.

**Importante**: Você pode adicionar **ou** uma imagem de capa **ou** um vídeo, mas não ambos na mesma notícia.

### O que significa "destacar" uma notícia?

Notícias em destaque aparecem primeiro na lista e têm maior visibilidade. Use isso para notícias importantes.

## Perguntas sobre Testemunhos

### Por que meu testemunho não aparece?

Testemunhos precisam ser aprovados por um Admin antes de aparecerem publicamente. Isso pode levar algum tempo.

### Posso editar ou deletar meu testemunho depois de enviar?

Não, após enviar um testemunho, apenas um Admin pode editá-lo ou deletá-lo. Se precisar fazer alterações, entre em contato com um Admin.

### Quantos testemunhos posso enviar?

Não há limite de testemunhos que você pode enviar.

## Perguntas sobre a Bíblia Digital

### Meus favoritos são salvos?

Sim! Todos os versículos que você favorita são salvos e você pode acessá-los a qualquer momento.

### Posso usar a Bíblia sem fazer login?

Sim! A Bíblia está disponível para todos, mesmo sem fazer login no sistema. Você pode ler todos os livros e capítulos normalmente. Porém, algumas funcionalidades só funcionam quando você está logado:

- **Favoritar versículos** - precisa estar logado
- **Marcar versículos como lidos** - precisa estar logado
- **Criar e acompanhar plano de leitura** - precisa estar logado
- **Ver seus favoritos salvos** - precisa estar logado

**Importante**: Você precisa de conexão com a internet para acessar o site e usar a Bíblia digital.

### Como funciona o plano de leitura?

Você escolhe em quantos dias quer ler a Bíblia toda. O sistema calcula automaticamente quantos capítulos você precisa ler por dia e acompanha seu progresso.

### Posso resetar meu progresso?

Sim! Na página da Bíblia, você pode resetar seus favoritos, seu progresso de leitura e seu plano de leitura.

## Perguntas sobre Eventos

### Como sei se um evento é da minha igreja?

Use o filtro no topo da página de Agenda para selecionar sua igreja. Apenas eventos daquela igreja serão mostrados.

### Posso ver eventos passados?

Sim, eventos passados ainda aparecem na lista, mas você pode filtrar para ver apenas eventos futuros.

## Perguntas para Admins

### Posso gerenciar usuários de outras igrejas?

Não. Você só pode gerenciar usuários da sua própria igreja. Apenas Superadmins podem gerenciar usuários de todas as igrejas.

### Como aprovo um testemunho?

1. Vá em **Testemunhos**
2. Você verá os testemunhos pendentes no topo
3. Clique em "Aprovar" ao lado do testemunho que deseja aprovar
4. O testemunho será publicado imediatamente

### Posso editar informações da minha igreja?

Não. Apenas Superadmins podem editar informações das igrejas. Se precisar fazer alterações, entre em contato com um Superadmin.

## Perguntas para Superadmins

### Posso deletar uma igreja?

Você só pode deletar uma igreja se ela não tiver nenhum conteúdo vinculado (usuários, notícias, eventos, ministérios ou testemunhos). O sistema avisará se houver conteúdo vinculado.

### Quantos Superadmins podem existir?

Não há limite, mas é recomendado ter apenas alguns Superadmins para manter a segurança do sistema.

### Como crio um novo Admin?

1. Vá em **Perfil**
2. Clique em "Criar novo administrador"
3. Preencha o formulário
4. Selecione a igreja que ele administrará
5. Clique em "Criar"

---

## Precisa de Ajuda?

Se você tiver dúvidas que não foram respondidas neste manual, entre em contato com:
- Um Admin da sua igreja
- Um Superadmin do sistema
- O suporte técnico

---

**Última atualização**: Este manual foi criado para ajudar você a usar o sistema APG 2.0 de forma eficiente. Se encontrar algum problema ou tiver sugestões, entre em contato com a equipe de suporte.

