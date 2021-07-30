const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
require('dotenv').config();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection();
module.exports = client;

['handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGOPATH, 
    {useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connect to mongo db'));

client.login(process.env.TOKEN);