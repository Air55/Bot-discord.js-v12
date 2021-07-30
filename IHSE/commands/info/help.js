const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "Shows all available bot commands",
    usage: 'help (command name)',
    run: async (client, message, args) => {       
        const prefix = await client.prefix(message)
        const color = '#f3f3f3'

      if (!args[0]) {
        let categories = [];

        readdirSync("./commands/").forEach((dir) => {
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );

          const cmds = commands.map((command) => {
            let file = require(`../../commands/${dir}/${command}`);
            if (!file.name) return "No command name.";
            let name = file.name.replace(".js", "");

            return `\`${prefix}${name}\``;
          });

          let data = new Object();

          data = {
            name: dir.toUpperCase(),
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          };

          categories.push(data);
        });

        const embed = new MessageEmbed()
          .setTitle("Here are all of my commands:")
          .addFields(categories)
          .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help set\`.`)
          .setColor(color);
        return message.channel.send(embed);
      } else {
        const command =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.find(
            (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
          );

        if (!command) {
          const embed = new MessageEmbed()
            .setDescription(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
            .setColor("FF0000");
          return message.channel.send(embed);
        }

        const embed = new MessageEmbed()
          .setTitle("Command Details:")
          .addField("COMMAND:", `\`${prefix}${command.name}\``)
          .addField("ALIASES:", command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command.")
          .addField("DESCRIPTION:", command.description ? command.description : "No description for this command.")
          .addField("USAGE:", command.usage ? `\`${prefix}${command.usage}\`` : `\`${prefix}${command.name}\``)
          .setColor(color);
        return message.channel.send(embed);
      }
    },
};