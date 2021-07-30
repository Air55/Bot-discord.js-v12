const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'dog',
    usage: 'dog',
    run: async (client, message) => {
        const url = 'https://some-random-api.ml/img/dog';

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;
        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new Discord.MessageEmbed()
            .setColor(`#f3f3f3`)
            .setTitle(`Dog`)
            .setImage(image.link)
        await message.channel.send(embed)
    }
}