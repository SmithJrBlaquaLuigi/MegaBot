exports.run = (client, message, args) => {
const group = message.channel;
const Discord = require("discord.js");
const embed = new Discord.RichEmbed()
.setTitle("Group Info")
.setColor(4447003)
.setThumbnail(`https://cdn.discordapp.com/icons/${group.id}/${group.icon}.png`)
.addField("Group Name", group.name)
.addField("Group Owner", group.owner.username)
.addField("Members", group.recipients.map(m => m.username).join(", "))
.addField("Created At", group.createdAt);
message.channel.send({embed});
}