// =============== CONFIGURAÇÕES INICIAIS ===============
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');

// =============== CONFIGURAÇÃO DO CLIENTE ===============
const client = new Client({
    intents: config.intents.map(intent => GatewayIntentBits[intent])
});

// Coleção para armazenar comandos
client.commands = new Collection();

// =============== CARREGAMENTO DE COMANDOS ===============
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

// =============== CARREGAMENTO DE EVENTOS ===============
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, Array.from(client.commands.values()).map(cmd => cmd.data)));
    } else {
        client.on(event.name, (...args) => event.execute(...args, Array.from(client.commands.values()).map(cmd => cmd.data)));
    }
}

// =============== HANDLER DE COMANDOS ===============
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: 'Houve um erro ao executar este comando!', 
            ephemeral: true 
        });
    }
});

// =============== INICIALIZAÇÃO DO BOT ===============
client.login(process.env.DISCORD_TOKEN); 