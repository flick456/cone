const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    description: "Skip to the selected queue number",
    usage: "skipto <number>",
    aliases: ["skipin"],
    category: "music",

  run: async (client, message, args) => {
    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `**Usage**: \`skipto <number>\``
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (args[0] > queue.songs.length)
      return message.channel.send(`The queue is only ${queue.songs.length} songs long!`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        message.client.queue.delete(message.guild.id);
       return message.channel.send(`:notes: The player has stopped and the queue has been cleared.: ${error}`);
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "GREEN",
                            description: `${message.author} ⏭ skipped \`${args[0] - 1}\` songs`
                        }
   
                   }).catch(console.error);
                   message.react("✅")

  },
};