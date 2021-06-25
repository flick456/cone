const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "voicemove",
  aliases: ["dragall", "vcmove"],
  usage: "voicemove",
  category: "moderation",
  description: "To drag members from one voice channel to another",
  run: async (client, message, args) => {if (!message.member.hasPermission("MOVE_MEMBERS")) {
    return message.reply(`You need the \`Move_Members\` permission to use this command.`);
}
let channel = message.member.voice.channel;
if (!channel) return message.channel.send("You Have To Be In A Voice Channel To Use This Command");
if (!message.guild.me.voice.connection) {
    channel.join().then((connection) => {
        message.guild.me.voice.setSelfDeaf(true);
        const paras = new MessageEmbed()
        .setDescription('** Now, move me and I will drag you all to a new voice channel.**')
         .setColor('RANDOM')
message.channel.send(paras) 
         client.on("voiceStateUpdate", async (oldmem, newmem) => {
            if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {
                let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);
                if (client.user.id === newmem.member.user.id) {
                    channel.members.forEach(e => {
                        e.voice.setChannel(newchannel);
                        newchannel.leave();
                    })
                }
            }
        })
    })
} else {
    message.channel.send(`**I am already connected To a voice channel!**`);
}
  }
};