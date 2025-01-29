const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-canais')
        .setDescription('Configura os canais do servidor para uma comunidade de jogos')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            // Confirma com o usuário
            await interaction.reply({
                content: '⚠️ ATENÇÃO! Esta ação irá apagar todos os canais existentes e criar uma nova estrutura. Você tem certeza?\nResponda com "CONFIRMAR" para prosseguir.',
                ephemeral: true
            });

            // Cria um coletor para aguardar a confirmação
            const filter = m => m.author.id === interaction.user.id && m.content === 'CONFIRMAR';
            const collector = interaction.channel.createMessageCollector({ filter, time: 30000, max: 1 });

            collector.on('collect', async () => {
                await interaction.editReply({ content: '🔄 Iniciando configuração dos canais...', ephemeral: true });
                const guild = interaction.guild;

                try {
                    // Apaga todos os canais existentes
                    const channels = await guild.channels.fetch();
                    for (const channel of channels.values()) {
                        await channel.delete().catch(console.error);
                    }

                    // Criação das categorias
                    const categories = {
                        admin: await guild.channels.create({
                            name: '⚡ ADMIN',
                            type: ChannelType.GuildCategory
                        }),
                        importante: await guild.channels.create({
                            name: '📌 IMPORTANTE',
                            type: ChannelType.GuildCategory
                        }),
                        boasVindas: await guild.channels.create({
                            name: '👋 ENTRADA',
                            type: ChannelType.GuildCategory
                        }),
                        comunidade: await guild.channels.create({
                            name: '🌟 COMUNIDADE',
                            type: ChannelType.GuildCategory
                        }),
                        freefire: await guild.channels.create({
                            name: '🔥 FREE FIRE',
                            type: ChannelType.GuildCategory
                        }),
                        apostas: await guild.channels.create({
                            name: '💰 APOSTAS FF',
                            type: ChannelType.GuildCategory
                        }),
                        torneios: await guild.channels.create({
                            name: '🏆 TORNEIOS FF',
                            type: ChannelType.GuildCategory
                        }),
                        conteudo: await guild.channels.create({
                            name: '📸 CONTEÚDO FF',
                            type: ChannelType.GuildCategory
                        }),
                        streaming: await guild.channels.create({
                            name: '🎥 LIVES FF',
                            type: ChannelType.GuildCategory
                        }),
                        voz: await guild.channels.create({
                            name: '🎧 CANAIS DE VOZ',
                            type: ChannelType.GuildCategory
                        })
                    };

                    // Canais administrativos (com permissões restritas)
                    const adminChannels = [
                        // Canais de texto
                        { name: '🔒-comandos-admin', type: ChannelType.GuildText },
                        { name: '📊-logs', type: ChannelType.GuildText },
                        { name: '⚙️-configurações', type: ChannelType.GuildText },
                        { name: '🚨-denúncias', type: ChannelType.GuildText },
                        { name: '📝-notas-staff', type: ChannelType.GuildText },
                        { name: '💼-controle-apostas', type: ChannelType.GuildText },
                        // Canais de voz
                        { name: '🎙️ Reunião Staff', type: ChannelType.GuildVoice },
                        { name: '🔒 Sala Privada 1', type: ChannelType.GuildVoice },
                        { name: '🔒 Sala Privada 2', type: ChannelType.GuildVoice },
                        { name: '💼 Sala de Apostas', type: ChannelType.GuildVoice }
                    ];

                    // Canais importantes
                    const importantChannels = [
                        { name: '📋-regras', type: ChannelType.GuildText },
                        { name: '📢-anúncios', type: ChannelType.GuildText },
                        { name: '🎫-tickets', type: ChannelType.GuildText },
                        { name: '🎭-cargos', type: ChannelType.GuildText },
                        { name: '📌-parcerias', type: ChannelType.GuildText },
                        { name: '🎖️-staff', type: ChannelType.GuildText }
                    ];

                    // Canais de entrada
                    const welcomeChannels = [
                        { name: '👋-bem-vindo', type: ChannelType.GuildText },
                        { name: '📝-apresente-se', type: ChannelType.GuildText },
                        { name: '��-auto-roles', type: ChannelType.GuildText }
                    ];

                    // Canais da comunidade
                    const communityChannels = [
                        { name: '💬-chat-geral', type: ChannelType.GuildText },
                        { name: '🤝-networking', type: ChannelType.GuildText },
                        { name: '💡-sugestões', type: ChannelType.GuildText },
                        { name: '📷-selfies', type: ChannelType.GuildText }
                    ];

                    // Canais Free Fire
                    const freefireChannels = [
                        { name: '🔥-novidades-ff', type: ChannelType.GuildText },
                        { name: '🎮-dicas-ff', type: ChannelType.GuildText },
                        { name: '💎-eventos-ff', type: ChannelType.GuildText },
                        { name: '🏅-rankings-ff', type: ChannelType.GuildText },
                        { name: '🎯-procurar-squad', type: ChannelType.GuildText },
                        { name: '💪-melhores-builds', type: ChannelType.GuildText },
                        { name: '🎁-sorteios-ff', type: ChannelType.GuildText }
                    ];

                    // Canais de Apostas
                    const bettingChannels = [
                        { name: '💰-apostas-ativas', type: ChannelType.GuildText },
                        { name: '📊-odds-ao-vivo', type: ChannelType.GuildText },
                        { name: '🎲-resultados', type: ChannelType.GuildText },
                        { name: '💵-mercado-ff', type: ChannelType.GuildText },
                        { name: '📈-dicas-trades', type: ChannelType.GuildText },
                        { name: '🏆-previsões', type: ChannelType.GuildText },
                        { name: '⚠️-alertas', type: ChannelType.GuildText }
                    ];

                    // Canais de Torneios
                    const tournamentChannels = [
                        { name: '🏆-torneios-ativos', type: ChannelType.GuildText },
                        { name: '📝-inscrições', type: ChannelType.GuildText },
                        { name: '📋-regras-torneio', type: ChannelType.GuildText },
                        { name: '🎯-resultados-partidas', type: ChannelType.GuildText },
                        { name: '💰-premiações', type: ChannelType.GuildText },
                        { name: '📊-tabelas', type: ChannelType.GuildText }
                    ];

                    // Canais de conteúdo
                    const contentChannels = [
                        { name: '📸-screenshots', type: ChannelType.GuildText },
                        { name: '🎥-clips-ff', type: ChannelType.GuildText },
                        { name: '🎯-highlights', type: ChannelType.GuildText },
                        { name: '🎬-montagens', type: ChannelType.GuildText },
                        { name: '📱-memes-ff', type: ChannelType.GuildText }
                    ];

                    // Canais de streaming
                    const streamingChannels = [
                        { name: '🎥-lives-ativas', type: ChannelType.GuildText },
                        { name: '📢-divulgação', type: ChannelType.GuildText },
                        { name: '🎮-streamers-parceiros', type: ChannelType.GuildText }
                    ];

                    // Canais de voz
                    const voiceChannels = [
                        // Área Geral
                        { name: '🎮 Lobby FF', userLimit: 0 },
                        { name: '💬 Café', userLimit: 0 },
                        // Squads
                        { name: '🔥 Squad 1', userLimit: 4 },
                        { name: '🔥 Squad 2', userLimit: 4 },
                        { name: '🔥 Squad 3', userLimit: 4 },
                        { name: '🔥 Squad 4', userLimit: 4 },
                        // Competitivo
                        { name: '🏆 Competitivo 1', userLimit: 4 },
                        { name: '🏆 Competitivo 2', userLimit: 4 },
                        // Apostas
                        { name: '💰 Sala de Trades', userLimit: 0 },
                        { name: '📊 Análises', userLimit: 0 },
                        // Outros
                        { name: '🎤 Reunião', userLimit: 10 },
                        { name: '🔊 AFK', userLimit: 0 }
                    ];

                    // Função auxiliar para criar canais
                    const createChannels = async (channels, category) => {
                        for (const channel of channels) {
                            const channelData = {
                                name: channel.name,
                                parent: category.id
                            };

                            // Se for da categoria de voz e não tiver tipo especificado, será canal de voz
                            if (category.id === categories.voz.id && !channel.type) {
                                channelData.type = ChannelType.GuildVoice;
                                channelData.userLimit = channel.userLimit || 0;
                            } else {
                                // Se tiver tipo especificado, usa ele, senão será texto
                                channelData.type = channel.type || ChannelType.GuildText;
                            }

                            // Configurações especiais para canais admin
                            if (category.id === categories.admin.id) {
                                channelData.permissionOverwrites = [
                                    {
                                        id: guild.roles.everyone.id,
                                        deny: ['ViewChannel']
                                    },
                                    {
                                        id: guild.roles.cache.find(r => r.name === 'Admin')?.id || guild.roles.everyone.id,
                                        allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                                    }
                                ];
                            }

                            try {
                                await guild.channels.create(channelData);
                            } catch (error) {
                                console.error(`Erro ao criar canal ${channel.name}:`, error);
                            }
                        }
                    };

                    // Criar todos os canais
                    await createChannels(adminChannels, categories.admin);
                    await createChannels(importantChannels, categories.importante);
                    await createChannels(welcomeChannels, categories.boasVindas);
                    await createChannels(communityChannels, categories.comunidade);
                    await createChannels(freefireChannels, categories.freefire);
                    await createChannels(bettingChannels, categories.apostas);
                    await createChannels(tournamentChannels, categories.torneios);
                    await createChannels(contentChannels, categories.conteudo);
                    await createChannels(streamingChannels, categories.streaming);
                    await createChannels(voiceChannels, categories.voz);

                    await interaction.editReply({
                        content: '✅ Configuração concluída! Os canais foram recriados com sucesso.',
                        ephemeral: true
                    }).catch(console.error);
                } catch (error) {
                    console.error('Erro durante a configuração:', error);
                    await interaction.editReply({
                        content: '❌ Ocorreu um erro durante a configuração dos canais.',
                        ephemeral: true
                    }).catch(console.error);
                }
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({
                        content: '❌ Tempo esgotado ou ação cancelada.',
                        ephemeral: true
                    }).catch(console.error);
                }
            });

        } catch (error) {
            console.error('Erro inicial:', error);
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({
                    content: '❌ Ocorreu um erro ao executar o comando.',
                    ephemeral: true
                }).catch(console.error);
            } else {
                await interaction.reply({
                    content: '❌ Ocorreu um erro ao executar o comando.',
                    ephemeral: true
                }).catch(console.error);
            }
        }
    }
}; 