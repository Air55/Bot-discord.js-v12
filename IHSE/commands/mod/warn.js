const Discord = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'Warn a member',
    usage: 'warn [member/id] (reason)',
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return
        const prefix = await client.prefix(message)
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user
        
        const Example_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${prefix}warn [user] (reason)`)

        if(!args[0]) return message.channel.send(Example_message)
        if(!user) return message.channel.send('User is n0t found')

        setTimeout(()=>{message.delete()})

        const emb = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${user.tag} was warned`)
        message.channel.send(emb)

        let reason = args.slice(2).join(' ')
        if(!reason) reason = 'No reason given'

        const embd = new Discord.MessageEmbed()
            .setColor('#00000')
            .setTitle('Warn')
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addField('Member:',`${user.tag} (${user.id})`)
            .addField('Moderator:', message.author.tag, false)
            .addField('Reason:', reason, false)
            .setTimestamp(message.createdAt)
            .setFooter(`Case ${server.Case}`)
        your.channel.send(embd) 
    }
}