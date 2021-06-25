const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    description: "To add the bot in your server",
    usage: "invite",
    aliases: ["inviteme"],
    category: "info",

  run: async function (client, message, args) {
    
    var permissions = 322300998;
    
    let invite = new MessageEmbed()
    .setTitle(`Invite Cone`)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setColor("GREEN")
    return message.channel.send(invite);
  },
};