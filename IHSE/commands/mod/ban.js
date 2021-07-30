const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Ban a member',
    usage: 'ban [member/id] (reason)',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const prefix = await client.prefix(message)

        const Example_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
	        .setDescription(`${prefix}ban [user/id] (reason)`)

        if(!args[0]) return message.channel.send(Example_message)
        if(!user) return message.channel.send('User is not found')
        if(!user.bannable) return message.channel.send('I can\'t ban that user')

        setTimeout(()=> user.ban(), 700)
        setTimeout(()=>{message.delete()}) 

        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason given'

        if(reason === 'No reason given') {
            user.send(`You were baned from ${message.guild.name}`)
        } else {
            user.send(`You were baned from ${message.guild.name} || ${reason}`)
        }

        const Channel_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${user.user.tag} was baned`)
        message.channel.send(Channel_message)

        const Log_message = new Discord.MessageEmbed()
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setColor('#00000')
            .setTitle('Ban')
            .addField('Member:',`${user.user.tag} (${user.id})`)
            .addField('Moderator:', message.author.tag, false)
            .addField('Reason:', reason, false)
            .setTimestamp(message.createdAt)
            .setFooter(`Case ${data.Case}`)
        your.channel.send(Log_message) 
    }
}