const client = require('../index')

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`)
    client.user.setActivity('!help'); 
})