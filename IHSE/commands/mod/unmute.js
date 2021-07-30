const Discord = require('discord.js')

module.exports = {
    name: 'unmute',
    description: 'Unmute a member',
    usage: 'unmute [member/id] (reason)',
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])  
        const prefix = await client.prefix(message) 

        const Example_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${prefix}unmute [user]`)

        if(!args[0]) return message.channel.send(Example_message)
        if(!user) return message.channel.send('User is not found')
        
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        await user.roles.remove(role)

        const Channel_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${user.tag} unmuted`)
        message.channel.send(Channel_message)

        let reason = args.slice(2).join(' ')
        if(!reason) reason = 'No reason given'

        const Log_message = new Discord.MessageEmbed()
            .setColor('#00000')
            .setTitle('Unmute')
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .addField('Member:',`${user.tag} (${user.id})`)
            .addField('Moderator:', message.author.tag)
            .addField('Reason:', reason, true)
            .setTimestamp(message.createdAt)
            .setFooter(`Case ${server.Case}`)
        your.channel.send(Log_message) 
    }
}