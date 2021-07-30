module.exports = {
    name: 'bans',
    usage: 'bans',
    run: async (client, message) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return
        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} `)
        })
    }
}