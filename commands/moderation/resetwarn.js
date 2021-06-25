const db = require("quick.db");

module.exports = {
  name: "clearwarns",
  aliases: ["resetwarns"],
  category: "moderation",
  usage: "clearwarns <@user>",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Yopu should have admin perms to use this command"
      );
    }

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send("Please mention the person whose warning you want to reset");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bots cannothave warnings");
    }

    if (message.author.id === user.id) {
      return message.channel.send("❌ You are not allowed to reset your warnings");
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} do not have any warnings`);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`
    );
    await message.channel.send(
      `Warnings of ${message.mentions.users.first().username} have been reset`
    );
  }
};