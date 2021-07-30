const Discord = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Delete a number of messages from a channel',
    usage: 'clear [number]',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return
        const prefix = await client.prefix(message)
        
        const Example_message = new Discord.MessageEmbed()
            .setColor('#f3f3f3')
	        .setDescription(`${prefix}clear [number]`)
        if(!args[0]) return message.channel.send(Example_message)

        let count = Number.parseInt(args[0])
        if(count > 99) count = 99
        if(count <= 0) return
        await message.channel
            .bulkDelete(count + 1)
            .then(() => {
                ms = message.channel.send(`Message delete ${count}`).then(d_msg => { 
                    d_msg.delete({timeout: 1500})})
        })
    }
}