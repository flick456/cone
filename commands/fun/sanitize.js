module.exports = {
name: "sanitize", 
aliases: ["sanitizee"], 
category: "fun",
description: "Sanitize the channel.xd",
usage: "sanitize",

run : async(client, message, args) => {
       
        message.channel
            .send("Starting sanatization process :mask:")
            .then((msg) => {
            setTimeout(() => {
                msg.edit("Disinfecting the channel 🧼🧴");
            }, 3000);
            setTimeout(() => {
                msg.edit("Cleaning pfps 🧼🧴");
            }, 6000);
            setTimeout(() => {
                msg.edit("Sanatizing words 🧼📝");
            }, 9000);
            setTimeout(() => {
                msg.edit("Killing all germs 🦠🔫");
            }, 12000);
            setTimeout(() => {
                msg.edit("This channel is sanatized! \nHave a nice day!");
            }, 15000);
            })
           
        
    }
}