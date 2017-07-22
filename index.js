const Discord = require('discord.js');
const client = new Discord.Client();
const bot = client.user

const config = require('./config.json');
const prefix = config.prefix;
const botOwnerID = config.botOwnerID;


client.on('ready', () => {
console.log(`I am Ready in ${client.guilds.size} servers and ${client.channels.size} channel!\nWorking for ${client.users.size} users.\n\n`);
if(config.streaming === true){
bot.setGame(config.game, 'setStream');
}else {
bot.setGame(config.game);
}

});

client.on('message', message => {
if (message.channel.type !== "group") return;
if (!message.content.startsWith(prefix)) return;
const group = message.channel;
const msg = message.content.toLowerCase();
const args = msg.split(" ");
const command = args.shift().slice(config.prefix.length)

if(msg.startsWith(prefix + 'eval')){
const clean = text => {
if (typeof(text) === "string") {
return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
}else {
return text;
}

}
try {
const args = message.content.split(' ').slice(1);
const code = args.join(' ');
let evaled = eval(code);
if (typeof evaled !== 'string')
evaled = require('util').inspect(evaled);
message.edit({embed: {
color:3447003,
title:'EVAL',
description:`**EVAL INPUT:**\n\`\`\`${code}\`\`\`\n\n**EVAL OUTPUT:**\n\`\`\`${clean(evaled)}\`\`\``
}});
} catch (err) {
      message.edit({embed: {
      title:'EVAL ERROR',
      description:`**ERROR**\`\`\`xl\n${clean(err)}\n\`\`\``
      }});
}
}else {
try {
let commandFile = require(`./commands/${command}.js`);
commandFile.run(client, message, args);
} catch (err) {
console.error(err);
}
}
});