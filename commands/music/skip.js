const { Util, MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    description: "To skip the current music",
    usage: "skip",
    aliases: ["skipsong"],
    category: "music",

  run: async (client, message, args) => {
    const channel = message.member.voice.channel
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to use this command!");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.channel.send("There is nothing playing that I could skip for you.");
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("RANDOM")
      .setTitle("Music has been Resumed!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        message.client.queue.delete(message.guild.id);
        return message.channel.send(`:notes: The player has stopped and the queue has been cleared.: ${error}`);
      }
    message.react("✅")
  },
};