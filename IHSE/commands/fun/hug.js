const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'hug',
    usage: 'hug (member/id)',
    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/animu/hug';
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }
        let description = `${message.author} hugs ${user}`
        if(!user) description = `${message.author} hugs all!`

        const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setDescription(description)
            .setImage(data.link)
        message.channel.send(embed)
    }
}