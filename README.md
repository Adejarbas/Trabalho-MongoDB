# Gestão de Academia

Sistema completo para gerenciamento de academias, desenvolvido como trabalho prático para a disciplina de Banco de Dados com MongoDB.

## 💡 Propósito

Este projeto tem como objetivo demonstrar a criação de uma aplicação web fullstack utilizando Node.js, Express, MongoDB e um frontend em HTML, CSS e JavaScript puro. O sistema permite o cadastro, consulta, edição e exclusão de alunos, professores, treinos e planos, além de consultas avançadas e validação de dados.

## 👥 Integrantes

- Adejarbas (https://github.com/Adejarbas)
- [Adicione aqui os nomes e GitHub dos outros integrantes, se houver]

## 🌐 Link da API Pública

> **Adicione aqui o link da API quando publicar (ex: https://trabalho-mongodb.vercel.app/api)**

## 🖥️ Link do Frontend

> O frontend pode ser aberto diretamente pelo arquivo `index.html` ou hospedado em um serviço como Vercel/Netlify.

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Adejarbas/Trabalho-MongoDB.git
   cd Trabalho-MongoDB



##  Instale as dependências:
  ```bash
  npm install
```

## Configure o arquivo .env com sua string de conexão do MongoDB.
## Inicie o servidor:
```bash
npm start
```

## Abra o arquivo index.html no navegador para acessar o frontend.  


## 🛠️ Tecnologias Utilizadas
Node.js
Express.js
MongoDB Atlas
express-validator
HTML, CSS, JavaScript

## 📚 Endpoints da API
## Alunos

GET /alunos — Lista todos os alunos

POST /alunos — Cria um novo aluno

PUT /alunos/:id — Atualiza um aluno

DELETE /alunos/:id — Remove um aluno

GET /alunos/filtrar — Consulta avançada com operadores (exemplo: idade mínima, peso máximo, etc.)

## Professores

GET /professores — Lista todos os professores

POST /professores — Cria um novo professor

PUT /professores/:id — Atualiza um professor

DELETE /professores/:id — Remove um professor

GET /professores/filtrar — Consulta avançada com operadores (exemplo: especialidade, tempo de experiência, etc.)

## Treinos

GET /treinos — Lista todos os treinos

POST /treinos — Cria um novo treino

PUT /treinos/:id — Atualiza um treino

DELETE /treinos/:id — Remove um treino

GET /treinos/filtrar — Consulta avançada com operadores (exemplo: duração mínima, tipo, etc.)

## Planos

GET /planos — Lista todos os planos

POST /planos — Cria um novo plano

PUT /planos/:id — Atualiza um plano

DELETE /planos/:id — Remove um plano

GET /planos/filtrar — Consulta avançada com operadores (exemplo: valor mínimo, duração, etc.)



## 📄 Documentação das Chamadas REST
No projeto há um arquivo api.http (ou requests.rest) com exemplos de chamadas GET, POST, PUT e DELETE para testar a API usando a extensão REST Client do VSCode.

## 📝 Observações
Todos os dados são validados com express-validator.
O projeto segue as melhores práticas de organização de código e versionamento.
O sistema está pronto para ser hospedado em plataformas como Vercel, Render, Cyclic, etc.

## Trabalho prático para a disciplina de Banco de Dados - MongoDB.
