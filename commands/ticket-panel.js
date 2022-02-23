const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const embed = new MessageEmbed()
            .setColor('#933fd6')
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "**Sistema de Atendimento**\n" +


                "> Clique no botão a baixo para abrir um ticket\n" +

                "> Nosso horário de atendimento vai das 9:00 até as 19:30 de Segunda a Sexta"

            )
            .setTitle('**📬 Atendimento ao Cliente**')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🎫 Abrir Ticket')
                .setStyle('SUCCESS'),
            );

        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    }
} 