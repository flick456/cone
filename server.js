const { default_prefix } = require("./config.json");
const { config } = require("dotenv");
const fetch = require("node-fetch");
const db =require("quick.db");
const inlinereply = require('discord-reply');
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const discord = require("discord.js");
const client = new discord.Client({
fetchAllMembers: true, 
  disableEveryone: false,
	autoReconnect: true,
	partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'USER']
});
const yts = require('yt-search')

client.queue = new Map();
client.vote = new Map();
const { ready } = require("./handlers/ready.js")


require("./uptime.js");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message =>
{
 
let prefix = db.get(`${message.guild.id}`);
if(!prefix || prefix === null) prefix = 'c?';
const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const matchedPrefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;


if(!message.content.startsWith(prefix) && !message.content.startsWith(matchedPrefix)) return;

 if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(matchedPrefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});
// EVENT handlers

const fs = require('fs');

fs.readdir('./handlers/', (err, files) => {
	if (err) return console.error();
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./handlers/${file}`);
		let eventname = file.split('.')[0];
		client.on(eventname, event.bind(null, client));
	});
	console.log(`Loaded ${files.length} Events !`);
});

//LEVEL

const { addexp } = require("./handlers/xp.js")

//LEVEL
client.on("message", async message => {
if(message.author.bot) return;
  if(!message.guild) return;
  
return addexp(message)
})

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
 
const { GiveawaysManager } = require('discord-giveaways');
client.giveaways = new GiveawaysManager(client, {
	hasGuildMembersIntent: true,
	storage: './giveaways.json',
	updateCountdownEvery: 5000,
	default: {
		embedColor: '#73FF33',
		// embedColorEnd: '#00ffff',
		reaction: '🎉',
		botsCanWin: true
	}
});
require('./giveaway.js')


// Mentionable form
client.on('message', msg => {
 

 if (!msg.content.startsWith('c?tag') || msg.author.bot) return;
 if(!msg.mentions.members.first()) return;
  const mtargets = msg.mentions.members;
       let membed = new discord.MessageEmbed()
       .setAuthor(`Paste the following to tag your teammates!`)
       .setTitle(`**${mtargets.map(member => member.user)}**`)
       .setColor("#E4A200")
       .setFooter("Click and Hold To Copy")
msg.channel.send(membed)

    }
);

client.on('message', msg => {
  if (!msg.content.startsWith('c?tag') || msg.author.bot) return;
  
   if(msg.mentions.members.first()) return;
  const mbanda = msg.author;
    const membedd = new discord.MessageEmbed()
    .setAuthor('Paste the following to tag yourself')
    .setTitle(`**${mbanda}**`)
    .setColor("#E4A200")
    .setFooter("Click and Hold To Copy")
    msg.channel.send(membedd)
});







client.on("ready", () => {
    client.user.setStatus("online");
    console.log("I'm ready")
});




client.on("ready", () => {
    client.user.setActivity(`c?help | c?invite`, { type: "LISTENING" })
})
client.login(process.env.TOKEN);
