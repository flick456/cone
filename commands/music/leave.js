module.exports = {
        name: "leave",
        description: "To make the bot leave the voice channel you are in",
        usage: "leave",
        aliases: ["leavevc"],
        category: "music",
    
    run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to use this command", message.channel);

    await channel.leave();
    message.react("✅")    
    }
};
