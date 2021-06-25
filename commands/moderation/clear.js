module.exports = {
  name: "purge",
  aliases:["clear"],
  usage: "purge <number_of_messages>",
  category: "moderation",
  description: "Delete bulk messages with 1 command",
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You do not have permissions!");
    }
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("I do not have permissions!");
    }

const member = message.mentions.members.first();
const messages = message.channel.messages.fetch();

if (member) {
  const userMessages = (await messages).filter((m) => m.author.id === member.id).filter(m => !m.pinned);
await message.channel.bulkDelete(userMessages);
message.channel.send(`${message.mentions.members.first().user.tag}'s messages have been cleared!`)
}
 else   {if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Missing Permissions!").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("Plaease provide a number").then(m => m.delete(5000));
    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true).catch(err => message.reply(`Something went wrong... ${err}`));
 }
  }
}