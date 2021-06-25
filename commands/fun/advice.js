const { Random } = require("something-random-on-discord")

module.exports = {
  name: "advice",
  category: "fun",
  usage: "advice",
  description: "Get some advice",
  run: async (client, message, args) => {
    
    let data = await Random.getAdvice()
    message.channel.send(data)
    
  }
}