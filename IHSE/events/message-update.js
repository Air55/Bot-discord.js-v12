const Discord = require('discord.js')
const client = require('../index')
const Schema = require('../module/server-schema')

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(!oldMessage.guild || oldMessage.author.bot) return
    const data = await Schema.findOne({ GuildID : oldMessage.guild.id })
    if(data == null) return 
    if(data.MessageLog == null) return
    const channel = await client.channels.fetch(data.MessageLog)

    let oldContent = oldMessage.content
    let newContent = newMessage.content 
    if(oldContent.length > 1024) oldContent = oldContent.slice(0, 1024)
    if(newContent.length > 1024) newContent = newContent.slice(0, 1024)

    const EditedLog = new Discord.MessageEmbed()
        .setColor('#00000')
        .setTitle('Edited message')
        .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
        .addField('Member:',`${oldMessage.author.tag} (${oldMessage.author.id})`)
        .addField('Before:', oldContent)
        .addField('After:', newContent)
        .addField('Channel:', oldMessage.channel)
        .setTimestamp(newMessage.createdAt)
    channel.send(EditedLog)
})