const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
  name: "greroll",
  description:
    "Reroll a giveaway",
  usage: "greroll <ID>",
  category:"giveaway",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission')

        if(!args[0]) return message.channel.send('Please specify a message id')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args[0]);
        if(!giveaway) return message.channel.send('Couldn\'t find the giveaway.')

        client.giveaways.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send("Giveaway rerolled.");
            })
            .catch(err => {
                console.log(err)
                message.channel.send(err)
            })
    }
}