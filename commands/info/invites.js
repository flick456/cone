const discord = require("discord.js");

module.exports = {
        name: "invites",
        category: "info",
        aliases: ["c?invited"],
        usage: "invites <@user>",
        description: "To get your or any user's invites in a server",
  run: async (client, message, args) => {
    let user
    
    if(message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if(args[0]) {
        target = message.guild.members.cache.get(args[0]).user;
      } else {
        user = message.author
      }
    message.guild.fetchInvites() .then (invites => { const userInvites = invites.array().filter(o => o.inviter.id === user.id); var userInviteCount = 0; for(var i=0; i < userInvites.length; i++) { var invite = userInvites[i]; userInviteCount += invite['uses']; } message.channel.send(`${user.tag} has ${userInviteCount} invites.`); } )
  }
}
