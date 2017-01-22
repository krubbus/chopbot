const Discord = require('discord.js');

exports.run = (client, msg, [cmd]) => {
  const owners = ["106061111605878784", "78980677566988288", "148151673141985280", "164086294048145408", "94911514401570816", "96652777131880448", "158261512723628032", "167123025135796224", "145967922253135872", "95598079960416256", "173867770570604544"];

  if(owners.indexOf(`${msg.author.id}`) > -1) {
    if (!cmd) {
      msg.author.sendMessage('', {
        embed: {
          author: {
            name: "Owner Commands",
            icon_url: client.user.avatarURL
          },
          color: 16645629,
          fields: [
            {
              name: "-conf <set|get|reset|list> [key] [what you want to set it to]",
              value: 'Define per-sever configuration.\n\nAliases: *"config"*'
            }
          ]
        }
      });
      msg.reply("Sent you a DM with information.")
    } else if (client.commands.has(cmd)) {
      cmd = client.commands.get(cmd);
      msg.author.sendMessage('', {
        embed: {
          author: {
            name: `${cmd.help.name}`,
            icon_url: client.user.avatarURL
          },
          color: 16645629,
          title: `${cmd.help.description}`,
          description: `\`${client.funcs.fullUsage(client, cmd)}\``
        }
      });
      msg.reply("Sent you a DM with information.")
    }
  } else {
    msg.reply("You need to be the owner of an RT Family Discord to view this help command.")
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor(16645629)
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);

  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "ownerhelp",
  description: "Displays help for owner commands.",
  usage: "[command:str]",
  usageDelim: "",
};
