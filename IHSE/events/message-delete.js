const Discord = require('discord.js')
const client = require('../index')
const Schema = require('../module/server-schema')

client.on('messageDelete', async (message) => {
    if(!message.guild || message.author.bot) return
    const data = await Schema.findOne({ GuildID : message.guild.id })
    if(data == null) return 
    if(data.MessageLog == null) return
    const channel = await client.channels.fetch(data.MessageLog)

    let content = message.content
    if(content.length > 1024) content = content.slice(0, 1024)

    const DeletedLog = new Discord.MessageEmbed()
        .setColor('#00000')
        .setTitle('Deleted message')
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .addField('Member:',`${message.author.tag} (${message.author.id})`)
        .addField('Content:', content)
        .addField('Channel:', message.channel)
        .setTimestamp(message.createdAt)
    channel.send(DeletedLog)
})