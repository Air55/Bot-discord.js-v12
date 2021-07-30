const client = require('../index')
const { Collection, TeamMember } = require('discord.js')
const voiceCollection = new Collection()
const Schema = require('../module/server-schema')

client.on('voiceStateUpdate', async (oldState, newState) => {
    const user = await client.users.fetch(newState.id)
    const member = newState.guild.member(user)

    const data = await Schema.findOne({ GuildID : oldState.guild.id })
    if(data == null) return 
    if(data.AutoVC == null) return
    const chan = await client.channels.fetch(data.AutoVC)

    if(!oldState.channel && newState.channel.id === chan.id) {
        const channel = await newState.guild.channels.create(user.username, {
            type: 'voice',
            parent: newState.channel.parent
        })
        member.voice.setChannel(channel)
        voiceCollection.set(user.id, channel.id)
    } else if(!newState.channel) {
        if(oldState.channelID === voiceCollection.get(newState.id)) return oldState.channel.delete()
    }
})