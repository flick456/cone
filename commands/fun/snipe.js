const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["msnipe", "messagesnipe"],
  category: "info",
  usage: "snipe",
  description: "To Get The last message which is deleted by message Author and Image(If any)",
  run:async (client, message, args) => {
    
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("There's nothing to snipe!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed
    .setImage(msg.image)
    .setColor("00FFFF")
    .setTimestamp();
    
    message.channel.send(embed)
   
    
  }
}
