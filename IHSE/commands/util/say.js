module.exports = {
    name: 'say',
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return
        setTimeout(()=>{message.delete()})
        const ms = args.join(" ")
        if(!ms) return message.channel.send('Please enter text')
        message.channel.send(ms)
    }
}