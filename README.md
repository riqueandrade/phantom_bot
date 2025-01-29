# Phantom Bot

Um bot para Discord desenvolvido com Node.js e discord.js.

## Requisitos

- Node.js 16.x ou superior
- NPM ou Yarn

## Configuração

1. Clone este repositório
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Crie um novo aplicativo no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications)
4. Crie um bot para seu aplicativo e copie o token
5. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env`
   - Preencha as variáveis:
     - `DISCORD_TOKEN`: Token do seu bot
     - `CLIENT_ID`: ID do seu aplicativo
     - `GUILD_ID`: ID do servidor Discord (opcional)

6. Inicie o bot:
```bash
npm start
# ou
yarn start
```

Para desenvolvimento, você pode usar:
```bash
npm run dev
# ou
yarn dev
```

## Comandos Disponíveis

- `!ping`: Responde com "Pong! 🏓"

## Contribuindo

Sinta-se à vontade para contribuir com o projeto criando issues ou pull requests. # phantom_bot
