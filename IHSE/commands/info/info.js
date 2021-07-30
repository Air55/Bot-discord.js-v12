const Discord = require('discord.js')

module.exports = {
    name: 'info',
    description: 'Get bot info',
    usage: 'info',
    run: async (client, message, args) => {
        const dev = client.users.cache.get(process.env.DEV)

        const embed = new Discord.MessageEmbed()
            .setColor('#00000')
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .addField('Servers:', `${client.guilds.cache.size} servers`, true)
            .addField('Server Users:', `${client.users.cache.size} users`, true)
            .addField('My Developer:', dev.tag, true)
            .addField('Version:', process.env.VERSION, true)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}