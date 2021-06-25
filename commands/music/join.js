module.exports = {
        name: "join",
        description: "To make the bot join the voice channel you are in",
        usage: "join",
        aliases: ["joinvc"],
        category: "music",
    
    run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to use this command", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);

    await channel.join();
    message.react("✅")    
    }
};
