const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "To kick a user",
  usage: "kick <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have permissions to kick someone`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`I don't have permissions to kick someone`)
    
    if(!args[0]) return message.channel.send(`Please mention someone to kick!`)
    
    if(!target) return message.channel.send(`❌ I can't find that user`)

    if(!reason) return message.channel.send(`Please Mention a reason for kick!`)
    
    if(target.bannable) {
      message.channel.send(`Kicked  ${target} | ${reason}`)  
      message.guild.member(target).kick(`${reason}`);
      
      message.delete()
      
    } else {
      return message.reply(`❌ I can't ban them, make sure that my role is above than their role!`)
    }
    return undefined
  }
};
