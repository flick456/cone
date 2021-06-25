module.exports = {
  name: "fast-type",
  aliases: ["fasttype"],
  category: "fun",
  description: "Test your typing speed and accuracy",
  usage: "fasttype",
  run : async (client ,message ,args) => {
const txtgen = require('txtgen')
const { FastType } = require('weky')
const game = new FastType({
    message: message,
    winMessage: `${message.author.toString()}, you won :)`,
    sentence: txtgen.sentence(), //sentence-to-be-typed
    loseMessage: `${message.author.toString()}, you lost :(`,
    time: 60000, //time that user has to type in ms
    startMessage: 'Good Luck!' //message sent when user starts playing
})
game.start()
  }
}