const client = require('../index')
const cooldown = new Set()

client.on("message", async (message) => {
    const prefix = '-'
    
    if(!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if(cooldown.has(message.author.id)) return message.reply(`Please wait`)
    cooldown.add(message.author.id);
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 3000 );
});