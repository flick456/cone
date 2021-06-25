const Discord = require('discord.js');

module.exports = {
    name: "gdelete",
    description: "Deletes a giveaway",
    aliases: ["gdel"],
    category: "giveaway",
    usage: "gdelete <giveaway_id>",

   run: async (client, message, args) => {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
            const messageID = args[0]
        
            const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args[0]);
                if(!messageID) return message.channel.send(`Please enter a valid messageID`)
                if(!giveaway) return message.channel.send('Giveaway not found')

await client.giveaways.delete(giveaway.messageID)
.then(() => {
   message.channel.send('Giveaway deleted!')
 .catch((err) => {
    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
});

})}
}