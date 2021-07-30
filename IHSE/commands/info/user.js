const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'user',
    description: 'Get user information',
    usage: 'user (member/id)',
    run: async (client, message, args) => {     
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let status = user.user.presence.status 
        if(status === 'dnd') status = '<:dnd:841717868974440508> Do not disturb'
        if(status === 'online') status = '<:online:841717387216814122> Online'
        if(status === 'idle') status = '<:idle:841717790184439848> Idle'
        if(status === 'offline') {
            if(user === message.member ) {
                status = '<:offline:841717770391781436> invisible '
            } else {
                status = '<:offline:841717770391781436> Offline'
            }
        }
        const roles = user.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)

        let displayRoles;
        if(roles.length === 0) {
            displayRoles = 'No roles '
        }
        else if(roles.length < 20) {
            displayRoles = roles.join(', ')
        } else {
            displayRoles = roles.slice(20).join(', ')
        };

        const color = user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor;

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL({dynamic: true})) 
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .addField('Status:', status, true )
            .addField('Activity: ', user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`, true)
            .addField(`User Roles (${roles.length}):`,  `${displayRoles}`, true)
            .addField('Created:', moment(user.user.createdTimestamp).format('DD-MM-YYYY [at] HH:mm'),true)
            .addField('Joined Server:', moment(user.user.joinedTimestamp).format('DD-MM-YYYY [at] HH:mm'), true)
            .setFooter(`ID: ${user.user.id}`)
        message.channel.send(embed)
    }
}