const Discord = require("discord.js");
const moment = require("moment");
const komada = require("../../package.json");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

  msg.channel.sendMessage('', {
    embed: {
      title: "ChopBot Statistics",
      color: 16645629,
      fields: [{
          name: "Memory Usage",
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          inline: true
        },
        {
          name: "Uptime",
          value: `${duration}`,
          inline: true
        },
        {
          name: "Servers, Channels & Users",
          value: `• ${client.guilds.size} servers, \n• ${client.channels.size} channels, \n• ${client.users.size} users.`,
          inline: true
        },
        {
          name: "Versions",
          value: `[Komada](): ${komada.version} \n[Discord.js](): v${Discord.version}`,
          inline: true
        }
      ],
      thumbnail: {
        url: "http://i.imgur.com/7lSighC.png",
        height: 50,
        width: 50
      },
      timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL,
        text: `Requested by ${msg.author.username}#${msg.author.discriminator}`
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["details", "statistics"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
