const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
        name: "gstart",
        description: "To start a quick giveaway",
        aliases: ["giveawaystart", "gcreate"],
        category: "giveaway",
        usage: 'gstart <channel> <duration> <winners> <prize>', 
    run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if(!channel) return message.channel.send('Please provide a channel!');

let duration = args[1];
if(
     !args[1] || (!duration.endsWith('d') &&
            !duration.endsWith('h') &&
            !duration.endsWith('m') &&
            !duration.endsWith('s')) || isNaN(ms(duration))
          )
            return message.channel.send('Please specify a valid duration. You need to use d (days), h (hours), m (minutes) , s (seconds)')



    let winners = args[2];
        winners = parseInt(winners); 
        if(![1,2,3,4,5,6,7,8,9,10].includes(winners) || !winners || isNaN(winners) || winners === null) return message.channel.send('Please specify a valid amount of winners. (It must be a number | Min: 1 | Max: 10)');

    

    let prize = args.slice(3).join(' ');
    if(!prize){
        return message.channel.send('What would be the prize?');
    }

       
    client.giveaways.start(channel, {
            time : ms(duration),
            prize : prize,
            winnerCount: winners,
            hostedBy: message.author ,
            messages: {
                giveaway:"🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: "Time Remaining: **{duration}**",
inviteToParticipate: "React with :tada: to join the giveaway!", 
               winMessage: `Congratulations {winners}, you have won the **${prize}** giveaway!\n{messageURL}` ,        embedFooter: "Ends At",
                noWinner: "No valid participations, no winners can be chosen!", 
                hostedBy: `Hosted by: {user}`,
                winners: "Winner(s)",
                endedAt: 'Ended at',
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: 'hours',
                    days: 'days',
                    pluralS: false
                }
          }          
        })

    }
};