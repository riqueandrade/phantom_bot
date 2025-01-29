const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Função para carregar a configuração
function loadConfig() {
    const configPath = path.join(__dirname, '..', 'config', 'serverConfig.json');
    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
        console.log('[CONFIG] Erro ao carregar configuração:', error);
        return { welcomeChannels: {} };
    }
}

// Função para salvar a configuração
function saveConfig(config) {
    const configPath = path.join(__dirname, '..', 'config', 'serverConfig.json');
    try {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
        console.log('[CONFIG] Configuração salva com sucesso');
    } catch (error) {
        console.error('[CONFIG] Erro ao salvar configuração:', error);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config-boas-vindas')
        .setDescription('Configura o canal de boas-vindas')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Selecione o canal para as mensagens de boas-vindas')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)),

    async execute(interaction) {
        const canal = interaction.options.getChannel('canal');
        const guildId = interaction.guild.id;
        
        console.log(`[CONFIG] Iniciando configuração para o servidor ${interaction.guild.name} (${guildId})`);
        console.log(`[CONFIG] Canal selecionado: ${canal.name} (${canal.id})`);
        
        try {
            // Carrega a configuração atual
            const config = loadConfig();
            
            // Tenta enviar uma mensagem de teste no canal
            await canal.send({
                content: '✅ Canal de boas-vindas configurado com sucesso! As mensagens serão enviadas aqui.'
            });
            
            // Salva a configuração
            config.welcomeChannels[guildId] = canal.id;
            saveConfig(config);
            
            // Atualiza também na memória
            interaction.client.welcomeChannel = canal;
            
            await interaction.reply({
                content: `✅ Canal de boas-vindas configurado com sucesso!\n\n📝 Agora todas as mensagens de boas-vindas serão enviadas em ${canal}\n\n🔍 Use \`/testar\` para ver como ficou!`,
                ephemeral: true
            });

        } catch (error) {
            console.error('[CONFIG] Erro:', error);
            await interaction.reply({
                content: `❌ Erro ao configurar o canal de boas-vindas. Por favor, tente novamente.`,
                ephemeral: true
            });
        }
    }
}; 