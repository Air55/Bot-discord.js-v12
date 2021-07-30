const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme',
	usage: 'meme',
    run: async (client, message) => {
	got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

            const embed = new Discord.MessageEmbed()
				.setColor(`RANDOM`)
				.setTitle(memeTitle)
				.setURL(memeUrl)
			    .setImage(memeImage)
			    .setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`)
			message.channel.send(embed);
		})
		.catch(console.error);
    }
};