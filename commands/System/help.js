const Discord = require('discord.js');

exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    msg.author.sendMessage('', {
      embed: {
        author: {
          name: "General Commands",
          icon_url: client.user.avatarURL
        },
        color: 16645629,
        fields: [
          {
            name: "-help [command]",
            value: 'Provides command help. Goes into detail if a command is specified.'
          },
          {
            name: "-ping",
            value: 'Pings the bot, returns with "PONG!" and the response time in milliseconds.'
          },
          {
            name: "-info",
            value: 'Provides some basic information about the bot.\n\nAliases: *"details", "what"*'
          },
          {
            name: "-8ball <question>?",
            value: 'Magic 8-Ball, does exactly what the toy does (Results may vary).\n\nAliases: *"8", "magic", "mirror", "magicconch"*'
          },
          {
            name: "-choice <first choice>, <second choice>",
            value: 'Makes a decision for you given some choices.\n\nAliases: *"choose", "decide"*'
          },
          {
            name: "-coinflip",
            value: 'Flips a (pseudo) coin. 🙂 for heads, 🙃 for tails.\n\nAliases: *"coin"*'
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
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "help",
  description: "Provides command help. Goes into detail if a command is specified.",
  usage: "[command:str]",
  usageDelim: "",
};
