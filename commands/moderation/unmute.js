const db = require("quick.db");

module.exports = {
  name: "unmute",
  usage: "unmute <@user>",
  category: "moderation",
  description: "To unmute a user",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "You don't have permissions to unmute someone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I don't have permission to manage roles!");
    }

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send("Please mention the member to whom you want to unmute");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("User is not muted");
    }

    user.roles.remove(muterole)

    await message.channel.send(`**${user.user.tag}** is now unmuted`);

    user.send(`You are now unmuted from **${message.guild.name}**`);
    
    message.delete()
  }
};