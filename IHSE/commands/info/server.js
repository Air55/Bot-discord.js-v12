const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Get server information',
    usage: 'server',
    run: async (client, message, args) => {
        const color = message.guild.owner.displayHexColor === "#000000" ? "#ffffff" : message.guild.owner.displayHexColor;
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic : true}))
            .addField('Owner:', message.guild.owner.user.tag, true)
            .addField('Members:', message.guild.memberCount, true)
            .addField('Creation Date:', message.guild.createdAt.toLocaleDateString("en-us"), true)
            .addField('Boost Level:', message.guild.premiumTier, true)
            .addField('Roles Count:', message.guild.roles.cache.size, true,)
            .addField('Region:', message.guild.region, true)
            .setFooter(`ID: ${message.guild.id}`)
        message.channel.send(embed)
    }
}