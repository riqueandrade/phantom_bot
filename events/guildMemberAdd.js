const { Events, EmbedBuilder } = require('discord.js');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');

// Função para carregar a configuração
function loadConfig() {
    const configPath = path.join(__dirname, '..', 'config', 'serverConfig.json');
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log('[WELCOME] Configuração carregada:', config);
        return config;
    } catch (error) {
        console.log('[WELCOME] Erro ao carregar configuração:', error);
        return { welcomeChannels: {} };
    }
}

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        console.log(`[WELCOME] Novo membro detectado: ${member.user.tag} (${member.id})`);
        console.log(`[WELCOME] Servidor: ${member.guild.name} (${member.guild.id})`);

        // Carrega a configuração e obtém o canal configurado
        const serverConfig = loadConfig();
        const channelId = serverConfig.welcomeChannels[member.guild.id];
        
        console.log('[WELCOME] ID do canal configurado:', channelId);

        // Tenta obter o canal
        let channel;
        if (channelId) {
            channel = member.guild.channels.cache.get(channelId);
            console.log('[WELCOME] Canal encontrado:', channel?.name || 'Não encontrado');
        }

        // Se não encontrou o canal configurado, usa o canal do sistema
        if (!channel) {
            channel = member.guild.systemChannel;
            console.log('[WELCOME] Usando canal do sistema:', channel?.name || 'Não encontrado');
        }

        // Se não tem nenhum canal disponível, retorna
        if (!channel) {
            console.log('[WELCOME] Nenhum canal disponível para enviar mensagem de boas-vindas');
            return;
        }

        // Função para formatar a data
        const formatarData = (data) => {
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(data);
        };

        // Criando uma mensagem de boas-vindas personalizada
        const welcomeEmbed = new EmbedBuilder()
            .setColor(config.colors.success)
            .setTitle(`🎉 Bem-vindo(a) ao ${member.guild.name}!`)
            .setDescription(`
                Olá ${member}! Que bom ter você aqui com a gente! 🤗
                
                📌 **Algumas informações sobre você:**
                • Conta criada em: ${formatarData(member.user.createdAt)}
                • Você é nosso ${member.guild.memberCount}º membro!
                
                🎯 **O que fazer agora?**
                • Leia as regras do servidor
                • Se apresente para a comunidade
                • Use </ajuda:0> para ver os comandos disponíveis
                
                Esperamos que você tenha ótimos momentos aqui! 🌟
            `)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter({ 
                text: '🎊 Novo membro chegou! | PhantomBot',
                iconURL: member.client.user.displayAvatarURL()
            });

        try {
            console.log('[WELCOME] Enviando mensagem de boas-vindas...');
            const welcomeMessage = await channel.send({ 
                content: `🎊 Hey pessoal, ${member} acabou de chegar! Vamos dar as boas-vindas!`,
                embeds: [welcomeEmbed] 
            });
            console.log('[WELCOME] Mensagem de boas-vindas enviada com sucesso');

            console.log('[WELCOME] Adicionando reações...');
            await welcomeMessage.react('👋');
            await welcomeMessage.react('🎉');
            await welcomeMessage.react('🤗');
            console.log('[WELCOME] Reações adicionadas com sucesso');

            console.log('[WELCOME] Tentando enviar DM para o novo membro...');
            await member.send({ embeds: [welcomeEmbed] });
            console.log('[WELCOME] DM enviada com sucesso');

        } catch (error) {
            console.error('[WELCOME] Erro durante o processo de boas-vindas:', error);
            console.log('[WELCOME] Detalhes do erro:', {
                name: error.name,
                message: error.message,
                code: error.code
            });
        }
    }
}; 