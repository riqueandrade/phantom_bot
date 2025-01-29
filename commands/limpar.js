const { SlashCommandBuilder } = require('discord.js');
const config = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('limpar')
        .setDescription('Limpa mensagens do canal')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Número de mensagens para apagar')
                .setRequired(false)),
        
    async execute(interaction) {
        // Verificação de permissão do usuário
        if (!interaction.memberPermissions.has('ManageMessages')) {
            return interaction.reply({ 
                content: 'Você não tem permissão para usar este comando!', 
                ephemeral: true 
            });
        }

        // Execução do comando de limpeza
        const amount = interaction.options.getInteger('quantidade') || 10;
        await interaction.channel.bulkDelete(amount, true);
        
        // Feedback temporário que some após 3 segundos
        await interaction.reply({ 
            content: `${amount} mensagens foram apagadas! 🧹`, 
            ephemeral: false 
        }).then(async () => {
            setTimeout(async () => {
                await interaction.deleteReply().catch(console.error);
            }, config.commands.deleteTimeout);
        });
    }
}; 