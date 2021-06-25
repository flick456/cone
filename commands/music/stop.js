const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
    description: "To stop the music and clearing the queue",
    usage: "stop",
    aliases: ["stopsong"],
    category: "music",

   run: async (client, message, args) => {
    const channel = message.member.voice.channel
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to use this command!");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.channel.send("There is nothing playing that I could stop for you.");
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅")
  },
};