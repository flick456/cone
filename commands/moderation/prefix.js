const Discord = require("discord.js");
// const database = require("../../database.json");
const fs = require("fs");
module.exports = {
  name: "setprefix",
  desc: "To change the prefix of the bot in a server",
  aliases: ["prefix"],
  usage: "prefix <newprefix>",
desc: "To set the server's prefix",
category: "moderation",
  run: async (client, message, args) => {
      if(!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission('MANAGE_GUILD')) return message.reply("You need \`ADMINISTRATOR\` permission to use this command") 
  /* const database = require("../../database");
 
   let prefix = database[`${message.guild.id}`]["prefix"];
   */
 
     if (!args[0]) return message.channel.send(`Please provide the new prefix.`);
    if (args[0].length > 5) {
      return message.channel.send(
        ` **|** Please provide a prefix without spaces and less than 5 characters.`
      );
    } else if (args[0].length < 5) {
      /* Gets the first argument and sets it as prefix
      database[`${message.guild.id}`]["prefix"] = args[0];
     
       Saves the modified JSON filenoed
      var saveJson = JSON.stringify(database, null, 4);
     fs.writeFile("database.json", saveJson, "utf8", error => {
        if (error) {
          console.error(error);
        message.channel.send(
         "There was an error saving the JSON file. The new prefix should work but will reset itself when the bot is restarted."
         );
        }
      }); */
      
  require("quick.db").set(message.guild.id, args[0])

      const embed = new Discord.MessageEmbed()
        .setDescription(
          `**|** Prefix has been set to \`${
            args[0]
          }\``
        )
        .setColor("0x#00ffff");
      message.channel.send(embed);
    }
  }
};