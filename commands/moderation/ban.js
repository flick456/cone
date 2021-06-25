const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "To ban a user",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`❌ You don't have permissions to ban someone`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`❌ I don't have permissions to ban someone`)
    
    if(!args[0]) return message.channel.send(`❌ Please mention someone to ban`)
    
    if(!target) return message.channel.send(`❌ I can't find that member`)

    if(!reason) return message.channel.send(`Please Mention a reason for ban!`)
    
    if(target.bannable) {
      message.channel.send(`Banned ${target} | ${reason}`) 
      
      message.guild.member(target).ban({
    reason: `${reason}`
  });
      
      message.delete()
      
    } else {
      return message.reply(`❌ I can't ban them, make sure that my role is above of than their role`)
    }
    return undefined
  }
};
