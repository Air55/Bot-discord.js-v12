const Discord = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Gives you a member\'s avatar',
    usage: 'avatar (member/id)',
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) ||  message.author
        if(user == undefined) return message.channel.send('Couldn\'t find user ')

        const avatar = user.avatarURL({dynamic: true, size: 4096})
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`[Avatar](${avatar}) for ${user.tag}`)
            .setImage(avatar)
        message.channel.send(avatarEmbed)   
    }
}