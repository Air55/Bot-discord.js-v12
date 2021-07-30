const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempban',
    aliases: ['tban'],
    usage: 'tempban [member/id] [time] (reason)',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return
        const prefix = await client.prefix(message)
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]

        const Example_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${prefix}tempban [user] [time] (reason)`)
            
        if(!args[0]) return message.channel.send(Example_message)
        if(!user) return message.channel.send('User is not found')
        if(!time) return message.channel.send(Example_message)

        setTimeout(()=> user.ban(), 700)
        setTimeout(()=>{message.delete()})
        setTimeout(async () => {
            await message.guild.members.unban(user.id)
        }, ms(time)) 
        
        let reason = args.slice(2).join(' ')
        if(!reason) reason = 'No reason given'

        if(reason === 'No reason given') {
            user.send(`You were tempbaned from ${message.guild.name} on ${time}`)
        } else {
            user.send(`You were tempbaned from ${message.guild.name} on ${time} || ${reason}`)
        }

        const Channel_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${user.tag} was tempbaned`)
        message.channel.send(Channel_message)

        const Log_message = new Discord.MessageEmbed()
            .setColor('#00000')
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setTitle('Tempban')
            .addField('Member:',`${user.tag} (${user.id})`)
            .addField('Moderator:', message.author.tag, false)
            .addField('Time:', time)
            .addField('Reason:', reason, false)
            .setTimestamp(message.createdAt)
            .setFooter(`Case ${data.Case}`)
        your.channel.send(Log_message) 
    }
}