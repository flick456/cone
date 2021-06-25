module.exports = async(client, oldMessage, newMessage) => {
if(newMessage.author && newMessage.author.bot) return;
 const message = oldMessage;
 client.snipes.set(message.channel.id, {
        content: message.embeds.length ? message.embeds[0].description : message.content,
        author: message.author ? message.author.tag : null,
        time: new Date(), 
        member: message.member,
        footer: "EDITED",
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
      });
if(!newMessage.guild) return;if(!newMessage.content) return;if(!oldMessage.content) return;

const { MessageEmbed } = require("discord.js");
const guild = newMessage.guild;
 if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const log = w.find((w) => w.name === "cone-logs");
if(log) {
if (newMessage.content.length > 1024) newMessage.content = newMessage.content.slice(0, 1021) + '...';
      if (oldMessage.content.length > 1024) oldMessage.content = oldMessage.content.slice(0, 1021) + '...';
if(oldMessage.content !== newMessage.content) {
const embed = new MessageEmbed()
.setColor("GREY")

.setDescription(`Message edited in ${newMessage.channel.toString()}`)
.setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({dynamic: true})) 
.addField(`❯ Old Mesaage`, oldMessage.content)
.addField(`❯ New Message`, newMessage.content)
.setFooter(`Message ID: ${newMessage.id}`)
.setTimestamp() 
.addField("\u200b",`**[Jump to the messsage](${newMessage.url})**`)


return log.send({
username: "Cone", 
avatarURL: "https://cdn.discordapp.com/avatars/840991712196558919/f8b954f6f530c3771231ba8001be58a5.webp", 
embeds: [embed]
})
}

}
}