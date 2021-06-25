const discord = require("discord.js");

module.exports = {
  name: "membercount",
  category: "info",
  usage: "membercount",
  description: "Membercount of the server",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(
    `
Total Members - ${message.guild.memberCount}
Humans - ${message.guild.members.cache.filter(m => !m.user.bot).size}
Bots - ${message.guild.members.cache.filter(m => m.user.bot).size}`)
    .setColor("RANDOM")
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
  }
}