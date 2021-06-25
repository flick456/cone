const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Toggle music loop",
    usage: "loop",
    aliases: ["loopqueue"],
    category: "music",

  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        };
    return message.channel.send("There is nothing playing in this server.");
  },
};