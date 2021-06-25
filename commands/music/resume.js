const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    description: "To resume the paused music",
    usage: "resume",
    aliases: ["resumesong"],
    category: "music",

  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("RANDOM")
      .setAuthor("Music has been Resumed!", "https://cdn.discordapp.com/avatars/840991712196558919/f8b954f6f530c3771231ba8001be58a5.webp")
      return message.channel.send("ok!fine");
    }
    return message.channel.send("There is nothing playing in this server.");
  },
};
