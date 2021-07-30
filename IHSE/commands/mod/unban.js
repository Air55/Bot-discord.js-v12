const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Unban a member',
    usage: 'unban [id] (reason)',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return
        const prefix = await client.prefix(message)
        const id = args[0]

        const Example_message = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setDescription(`${prefix}unban [user id] (reason)`)

        if(!id) return message.channel.send(Example_message)

        message.guild.fetchBans().then(async bans => {
            let user = bans.find(ban => ban.user.id == id)
            if(!user) return message.channel.send('User not banned')
            await message.guild.members.unban(user.user).catch(err => {
                return message.channel.send('Something went wrong!')
            }).then(() => { 
                const Channel_message = new Discord.MessageEmbed()
                    .setColor(`#f3f3f3`)
                    .setDescription(`${user.user.tag} unbaned`)
                message.channel.send(Channel_message)
            })
        })

        message.guild.fetchBans().then(async bans => {
            let user = bans.find(ban => ban.user.id == id)

            let reason = args.slice(1).join(' ')
            if(!reason) reason = 'No reason given'

            const Log_message = new Discord.MessageEmbed()
                .setColor('#00000')
                .setTitle('Unban')
                .addField('Member:', `${user.user.tag} (${id})`)
                .addField('Moderator:', message.author.tag)
                .addField('Reason:', reason)
                .setTimestamp(message.createdAt)
                .setFooter(`Case ${data.Case}`)
            your.channel.send(Log_message) 
        })
    }
}