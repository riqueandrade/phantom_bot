const { Events, Routes } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client, commands) {
        console.log(`Bot está online! Logado como ${client.user.tag}`);
        
        try {
            const rest = client.rest;
            console.log('Começando a atualizar os comandos (/).');
            
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            );
            
            console.log('Comandos (/) foram atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar os comandos:', error);
        }
    }
}; 