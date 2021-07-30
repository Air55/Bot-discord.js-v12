const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    description: 'invite Bot',
    run: async (client, message) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#00000')
            .setDescription(`[Invite](your bot link) bot!`)
        try {
            await message.author.send(embed)
            message.react('<:check_mark:842424073124577331>')
        } catch(error) {
            return message.react('<:emoji_10:842427516245377086>')
        }
    }
}