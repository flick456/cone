const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
        name: "gend",
        description: "Ending a giveaway",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-end"],
        usage: 'gend <giveawaymessageid>',
    run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
        if(!args[0]) return message.channel.send('Please specify a message id')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args.join(" "))
        if(!giveaway) return message.channel.send('Giveaway not found')

        client.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(()  => {
            message.channel.send(`Giveaway wil end in less than ${5000 / 1000} seconds.`)
        }).catch(err => {
            console.log(err)
            message.channel.send('An error occured')
        })
        
        }
    }