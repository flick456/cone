module.exports = async(client, member) => {
const discord = require("discord.js")
const db = require("quick.db")

  try {
    
 let ar = db.get(`${member.guild.id}-autoroles`);
if(db.get(`${member.guild.id}-autoroles`) !== null) {
let hi = ar.slice(1);
if(hi[0] || hi[0] !== null || hi.length) {
hi.forEach(role => { 
  if(member.guild.me.permissions.has("MANAGE_ROLES")) {
  member.roles.add(role) 
}
})
}
}
} catch (e) {
  console.error(e)
}



  
    let joinChannel = db.fetch(`welcome_${member.guild.id}`)

    if (joinChannel === null) return // message.channel.send(`\`${prefix}joinchannel\` **|** Please set a welcome channel first to preview it.`) 

    let joinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    if (joinMsg === null) {
        db.set(`joinmsg_${member.guild.id}`,`Welcome {member:mention}! We now have {server:members} member!`)
    }

    let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    let content = newJoinMsg  .replace(/{member:mention}/g, `<@${member.user.id}>`)      
  .replace(/{member:id}/g, `${member.user.id}`)
.replace(/{member:tag}/g, `${member.user.tag}`)
        .replace(/{member:username}/g, `${member.user.username}`) 
        .replace(/{member:discriminator}/g, `${member.user.discriminator}`)
        .replace(/{member:joinedAt}/g, `${member.joinedAt}`)
        .replace(/{member:createdAt}/g, `${member.user.createdAt}`)
        .replace(/{server:name}/g, `${member.guild.name}`)
        .replace(/{server:members}/g, `${member.guild.memberCount}`)
.replace(/{server:id}/g, `${member.guild.id}`)
 
.replace(/{date}/g, `${new Date().toDateString()}`)
    

const Discord = require("discord.js")
const canvas = require('discord-canvas'), welcomeCanvas = new canvas.Welcome(), leaveCanvas = new canvas.Goodbye();
const universalColor = "0x#FFFF00"
const c = "#3CC7EF"
let img = await welcomeCanvas.setUsername(member.user.username) .setDiscriminator(member.user.discriminator) .setMemberCount(member.guild.memberCount) .setGuildName(member.guild.name) .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
.setColor("border", "#0000FF") 
.setColor("username-box", c) 
.setColor("discriminator-box", c) 
.setColor("message-box", c)
.setColor("title", "#3CC7EF")
.setColor("avatar", "#FF0000")


// let image = await img.toAttachment();
// let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png"); 

const embed = new discord.MessageEmbed()
    .setColor("RANDOM")
//.setFooter(member.guild.name, member.guild.iconURL({dynamic: true}))
    .setImage(member.guild.iconURL({dynamic: true}))
    .setTimestamp() 
    .setDescription(content)
 .setThumbnail(member.user.displayAvatarURL({dynamic: true}))


const lc = member.guild.channels.cache
    .get(joinChannel);
    if(!lc) return;
    
    lc.send(`<@${member.user.id}>`,embed)
    .then(async() => lc.send(attachment))
}