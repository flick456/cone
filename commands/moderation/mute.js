const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "To mute someone",
  category: "moderation",
  usage: "mute <@user> .<reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You don't have permissions to mute someone!");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permissions to mute someone!");
    }

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send("\```Please mention the user you want to mute\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("I can't mute you because you are message author");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send(" \``` Please provide a reason for mute\``` ");
    }

    

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (!muterole) {
      return message.channel.send("\```Please create role a name with Muted \``` ");
    }
    
    
    await user.roles.add(muterole);

    await message.channel.send(
      `Sucessfully muted ${user.user.tag} | ${reason}`
    );

    user.send(`You have been muted in ${message.guild} | ${reason}`
    );
  }
};
