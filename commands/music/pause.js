const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    description: "To pause the current music in the server",
    usage: "pause",
    aliases: ["pausesong"],
    category: "music",

  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been paused!")
      return message.channel.send("Why did you pause the music? xd");
    }
    return message.channel.send("There is nothing playing in this server.");
  }
  };