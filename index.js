const { Client } = require("discord.js"),
config = require("./config.json");
express = require('express');
const { readdirSync } = require('fs');
const { join } = require('path');
app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] }),

client.on("ready", () => {
  console.log("Bot Online ✅")
})


// Event handler
readdirSync(join(__dirname, "./events")).forEach(file => {
    const f = require(`./events/${file}`);
    console.log(f);

    if (typeof (f) != "function") return;
    
    client.on(file.split(".")[0], (...args) => f(client, ...args));
});



client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});



const arrayOfStatus = [
    'NasaStore - Bot Official',
    'Os melhores preços aqui!',
    'Developed for Styleeh'
]

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`)
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)] }], status: 'idle', type: "WATCHING" })
    }, 10000)
})


//ticket-evento

const {
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    MessageEmbed
} = require('discord.js')

client.on("interactionCreate", async (interaction) => {

    await interaction.deferUpdate();
    if (interaction.isButton()) {
        if (interaction.customId === 'tic') {

            const thread = await interaction.channel.threads.create({
                name: `${interaction.user.tag}`,
                autoArchiveDuration: 1440,
            });
            const embed = new MessageEmbed()
                .setTitle('🚀 Atendimento Nasa')
                .setDescription('**Atendimento ao Cliente** \n Aguarde, um staff logo lhe atenderá')
                .setColor('#933fd6')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                }));

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('del')
                    .setLabel('🗑️ Fechar Ticket')
                    .setStyle('DANGER'),
                );
            thread.send({
                content: `O Ticket de <@${interaction.user.id}> foi aberto! <@&934885772086091886>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.followUp({
                content: 'Ticket Criado!',
                ephemeral: true
            }))
            console.log(`O ticket: ${thread.name} foi aberto`);
            setTimeout(() => {
                interaction.channel.bulkDelete(1)
            }, 2000)
        } else if (interaction.customId === 'del') {

            const thread = interaction.channel
            thread.delete();

        }
    }
}) 

client.login("ODc4NDg0MzQxOTY4MjMyNDU4.YSB2TA.ETFnSICf8vMO7mtlEEL-IpT8V1A")