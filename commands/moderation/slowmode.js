module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "slowmode <time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send("❌It doesn't seem to be valid number");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send("Slowmode is now for " + amount + " seconds");
        return;
      } else {
        message.channel.send("Slowmode is now for " + amount + " second");
        return;
      }
    }
    if (args[0] === amount + "m") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send("Slowmode is now for " + amount + " minutes");
        return;
      } else {
        message.channel.send("Slowmode is now for " + amount + " minute");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send("Slowmode is now for " + amount + " hours");
        return;
      } else {
        message.channel.send("Slowmode is now for " + amount + " hour");
        return;
      }
    } else {
      message.channel.send(
        "You can only set seconds(s), minutes(min) and hours(h)"
      );
    }
  }
};