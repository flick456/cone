const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Access restricted!"
      );
    }

    const user = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send(
        "Please Mention the person to who you want to warn - warn @mention <reaosn>"
      );
    }

    if (message.mentions.users.first().bots) {
      return message.channel.send("You can not warn bots");
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Please provide a reason to warn - warn @mention <reason>"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `You have been warned in **${message.guild.name}** for ${reason}`
      );
let embed = new MessageEmbed()
.setColor("GREEN")
	.setDescription(`${user} HAS BEEN WARNED | ${reason}.`)
	.setThumbnail('https://cdn.discordapp.com/avatars/840991712196558919/f8b954f6f530c3771231ba8001be58a5.webp')
	await message.channel.send(embed);
message.delete()	
}
       else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(`You have been warned in **${message.guild.name}** | ${reason}`);
      
      let embed = new MessageEmbed()
.setColor("GREEN")
	.setDescription(`${user} HAS BEEN WARNED AGAIN | ${reason}`)
	.setThumbnail('https://cdn.discordapp.com/avatars/840991712196558919/f8b954f6f530c3771231ba8001be58a5.webp')
	await message.channel.send(embed);
      
      message.delete()
      
    }
  }
};