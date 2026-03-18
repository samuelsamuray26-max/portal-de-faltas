# ◈ FreqControl — Portal de Controle de Faltas Recorrentes

Sistema web para controle de frequência escolar, com alertas automáticos para faltas consecutivas e baixa presença.

---

## 🚀 Como usar

1. **Abra o arquivo `index.html`** em um navegador moderno (Chrome, Firefox, Edge, Safari).
   - Não é necessário servidor. Abra direto do seu computador.
   - Todos os dados são salvos no **localStorage** do navegador.

2. **Crie uma conta** na tela de cadastro.

3. **Faça login** e acesse o Portal.

---

## 📁 Estrutura de Arquivos

```
portal-faltas/
├── index.html          # Tela de Login / Cadastro
├── portal.html         # Dashboard (lista de turmas)
├── turma.html          # Detalhes da turma (Alunos + UCs)
├── uc.html             # Frequência por Unidade Curricular
├── css/
│   └── style.css       # Estilos globais
├── js/
│   ├── auth.js         # Login, Cadastro, Logout
│   ├── storage.js      # Wrapper para localStorage
│   ├── turmas.js       # CRUD de Turmas
│   ├── alunos.js       # CRUD de Alunos
│   ├── ucs.js          # CRUD de Unidades Curriculares
│   └── frequencia.js   # Aulas, presenças e cálculo de alertas
└── README.md
```

---

## 🎯 Funcionalidades

### Autenticação
- Cadastro com nome, e-mail e senha
- Login com sessão persistida no localStorage
- Validação de e-mail duplicado
- Mensagens de erro/sucesso inline (sem `alert()`)

### Portal (Dashboard)
- Exibe "Bem-vindo, [Nome]"
- Mostra estatísticas: total de turmas, alunos e UCs
- CRUD de Turmas (criar e remover)
- Cada usuário vê apenas suas próprias turmas

### Turma
- **Aba Alunos**: Cadastrar, editar e remover alunos (nome + matrícula)
  - Matrícula única por turma
  - Exibe total de alunos
- **Aba UCs**: Cadastrar, editar e remover Unidades Curriculares (nome + total de aulas)
  - Exibe peso percentual de cada aula

### Frequência (por UC)
- Criar aulas com data (numeração automática: Aula 01, Aula 02…)
- Marcar presença/falta por aluno por aula (toggle: não registrado → presente → falta)
- Exibir percentual de presença em tempo real
- Impede criar aula sem alunos cadastrados

---

## 🚨 Regras de Alerta

### ⚠ Faltas Consecutivas (2+ seguidas)
- Detecta se o aluno faltou em 2 ou mais aulas **consecutivas** (pela ordem da aula)
- Destaca a linha em laranja
- Exibe tag `⚠ faltas consecutivas` abaixo do nome

### 🚨 Baixa Presença (< 40%)
- Calcula: `presenças / totalAulasPlanejadas * 100`
- Se abaixo de 40%, destaca a linha em vermelho
- Exibe tag `🚨 alerta de faltas` abaixo do nome
- Funciona independentemente do alerta de consecutivas

Ambos os alertas são calculados em tempo real a cada clique.

---

## 💾 Persistência

Todos os dados são armazenados no `localStorage` do navegador:

| Chave | Conteúdo |
|---|---|
| `pf_users` | Usuários cadastrados |
| `pf_session` | Usuário logado |
| `pf_turmas` | Todas as turmas |
| `pf_alunos_{turmaId}` | Alunos de cada turma |
| `pf_ucs_{turmaId}` | UCs de cada turma |
| `pf_aulas_{turmaId}_{ucId}` | Aulas de cada UC |
| `pf_presencas_{turmaId}_{ucId}_{aulaId}` | Presenças por aula |

---

## 🖥️ Tecnologias

- HTML5
- CSS3 (variáveis CSS, Grid, Flexbox, animações)
- JavaScript puro (Vanilla JS, sem frameworks)
- localStorage para persistência
- Google Fonts (Syne + IBM Plex Mono + IBM Plex Sans)

---

## ⚠️ Observações

- Os dados ficam armazenados **apenas no navegador** da máquina.
- Limpar o cache/dados do navegador apagará todos os registros.
- Recomendado usar Chrome ou Firefox para melhor compatibilidade.
