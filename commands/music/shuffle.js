const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle queue",
    usage: "shuffle",
    aliases: ["shufflesongs"],
    category: "music",

  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is no queue.").catch(console.error);
try{
    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    message.react("✅")
      } catch (error) {
        message.client.queue.delete(message.guild.id);
        return message.channel.send(`:notes: The music has been stopped and the queue has been cleared.: \`${error}\``);
     }
  },
};
