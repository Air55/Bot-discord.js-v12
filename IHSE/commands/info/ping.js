module.exports = {
    name: 'ping',
    description: 'Ping the bot',
    usage: 'ping',
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${Math.round(client.ws.ping)}ms`)
    }
}