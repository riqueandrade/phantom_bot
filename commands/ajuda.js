const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Mostra a lista de comandos disponíveis'),
        
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle('📚 Lista de Comandos')
            .setDescription('Aqui estão todos os comandos disponíveis:')
            .addFields(
                { 
                    name: '⚙️ Configuração',
                    value: '`/config-boas-vindas [canal]` - Define o canal para mensagens de boas-vindas (apenas administradores)'
                },
                { 
                    name: '🧹 Moderação',
                    value: '`/limpar [quantidade]` - Limpa mensagens do canal (precisa de permissão)'
                },
                {
                    name: '🛠️ Utilitários',
                    value: [
                        '`/ajuda` - Mostra esta lista de comandos',
                        '`/testar` - Testa as mensagens de boas-vindas'
                    ].join('\n')
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: 'PhantomBot - Seu assistente fantasma!',
                iconURL: interaction.client.user.displayAvatarURL()
            });
        
        await interaction.reply({ embeds: [helpEmbed] });
    }
}; 