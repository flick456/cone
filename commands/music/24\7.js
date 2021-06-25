const { MessageEmbed } = require("discord.js");
const fs = require('fs');


module.exports = {
    name: "24/7",
    description: "To make the bot stay in the vc 24/7",
    usage: "24/7",
    aliases: ["24/7"],
    category: "music",

  run: async(client, message, args) => {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var serverQueue = afk[message.guild.id]
       if (serverQueue) {
            serverQueue.afk = !serverQueue.afk;
             message.channel.send({
                embed: {
                    color: "RED",
                    description: `💤  **|**  24/7 is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
                }
            });
            return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
    });
        };
    return message.channel.send("There is nothing playing in this server.");
  },
};