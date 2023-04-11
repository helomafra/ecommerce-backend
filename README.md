# E-commerce Shopper

Projeto de um ecommerce de supermercado. Dentre os produtos exibidos, o usuário pode adicioná-los no carrinho e simular um pedido, inserindo seu nome e uma data de entrega.

Desenvolvido para participação no processo seletivo da empresa Shopper.com.br.

## 🚀 Tecnologias:

- NodeJS
- JavaScript
- Express
- Knex

## Acesse

- App
  https://shoppertest.vercel.app/

- Deploy backend
  https://ecommerce-api-csrl.onrender.com

![App Screenshot](https://i.imgur.com/jKjgwdJ.png)

## Endpoints e Documentação da API

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Shopper%20Teste%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fhelomafra%2Fecommerce-backend%2Fmain%2Fexport.json)

## Documentação de funcionamento

Clone o projeto

```bash
  git clone https://github.com/helomafra/ecommerce-backend
```

Crie um arquivo .env com os dados:

```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
NODE_ENV=
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

Faça as migrations

```bash
  npm run migrate
```

Alimente o banco

```bash
 npm run db:seed
```
