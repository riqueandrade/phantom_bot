// Configurações do Bot
module.exports = {
    // Intents necessárias para o bot
    intents: [
        'Guilds',            // Para interagir com servidores
        'GuildMessages',     // Para ler mensagens
        'MessageContent',    // Para acessar conteúdo das mensagens
        'GuildMembers',      // Para informações sobre membros
        'GuildPresences'     // Para status de presença
    ],

    // Cores padrão para embeds
    colors: {
        primary: 0x0099ff,
        success: 0x00ff00,
        error: 0xff0000,
        warning: 0xffff00
    },

    // Configurações de comandos
    commands: {
        prefix: '/',
        deleteTimeout: 3000 // Tempo para deletar mensagens temporárias (ms)
    }
}; 