# Projeto Fullstack Node.js + React | Next.js, NestJS com PostgreSQL e TypeORM
Este projeto utiliza Next.js e NestJS como frameworks, React para desenvolvimento do front, PostgreSQL como banco de dados, TypeORM como ORM para comunicação com o banco, e Docker + pgAdmin para administração.

## Descrição

[Nest](https://docs.nestjs.com/) framework TypeScript.

Certifique-se de que você tenha as seguintes ferramentas instaladas:

### Pré-requisitos backend
- Node.js (v22.7.0) ou superior.
- NestJS
- [Docker](https://docs.docker.com/desktop/install/windows-install)
- [Git](https://git-scm.com/downloads)

## Project Backend setup
- baixe o projeto Backend "youtube-rank-backend-challenge" e rode o comando abaixo na pasta raiz para instalar as dependências.

```bash
$ npm install
```

## Configure as variáveis de ambiente 
### Crie um arquivo .env na raiz do projeto com as seguintes informações:
```bash
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=root123
DB_NAME=postgres
DB_ADMIN_EMAIL=admin@admin.com
```

## Suba os containers do PostgreSQL e pgAdmin
```bash
docker-compose up -d
```

## Acesse o pgAdmin
### Você pode acessar o pgAdmin em http://localhost:8081. Use as credenciais definidas no docker-compose.yml para login e adicione o servidor PostgreSQL com as seguintes configurações:
```bash
Username: admin@admin.com
Password: root123
```

## Crie um novo server
### Click em 'Add New Server' e siga os passos abaixo e depois click em 'Save':
```bash
# General
Name: tossir_challenge

#Connection
Host name/address: postgres
Port: 5432
Maintenance databse: postgres
Username: root
Password: root123
```

## Compile e rode o projeto
### Link para a documentação do postman. 
[doc](https://documenter.getpostman.com/view/12934846/2sAYBd67X8)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Project Frontend setup
- Vá para o repositorio do frontend e baixe o projeto para instalar as dependências.
  
  [Frontend](https://github.com/Habynner/youtube-rank-front-challenge)


## Agora que estamos com a aplicação rodando, que tal se registrar, criar alguns registros e votar ?
[youtube_rank.com](http://localhost:3000)

## Stay in touch

- Author - Habynner Silva
- [Linkedin](https://www.linkedin.com/in/habynner-silva-developer/)
