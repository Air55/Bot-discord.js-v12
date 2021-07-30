const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'Mute a member so they cannot type',
    usage: 'mute [member/id] [time] (reason)',
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return
        const prefix = await client.prefix(message)
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        const role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted')
                
        const Example_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
	        .setDescription(`${prefix}mute [user] [time] (reason)`)

        if(!args[0]) return message.channel.send(Example_message)
        if(!user) return message.channel.send('User is not found')
        if(!time) return message.channel.send(Example_message)
        if(user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I can\'t mute that user')

        const User_has_mute_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${user.user.tag} is already muted!`)
        if(user.roles.cache.has(role2.id)) return message.channel.send(User_has_mute_message)

        await user.roles.add(role2)
        setTimeout(()=>{message.delete()})
        setTimeout(async () => {
            await user.roles.remove(role2)
        }, ms(time))

        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted' || 'Muted')
        if(!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted/mute role')
                let muterole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter( c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created')
            } catch(error) {
                console.log(error)
            }
        };

        let reason = args.slice(2).join(' ')
        if(!reason) reason = 'No reason given'

        if(reason === 'No reason given') {
            user.send(`You were muted from ${message.guild.name} on ${time}`)
        } else {
            user.send(`You were muted from ${message.guild.name} on ${time} || ${reason}`)
        }

        const Channel_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${user.user.tag} was muted`)
        message.channel.send(Channel_message)

        const Log_message = new Discord.MessageEmbed()
            .setColor('#00000')
            .setTitle('Mute')
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .addField('Member:',`${user.user.tag} (${user.id})`)
            .addField('Moderator:', message.author.tag)
            .addField('Time:', time, true)
            .addField('Reason:', reason, true)
            .setTimestamp(message.createdAt)
            .setFooter(`Case ${server.Case}`)
        your.channel.send(Log_message) 
    }
}