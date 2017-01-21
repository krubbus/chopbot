const util = require("util").inspect;

//exports.init = (client) => {
//  if (!client.funcs.confs.hasKey("logChannelID")) {
//    client.funcs.confs.addKey("logChannelID", "REPLACE WITH CHANNEL ID");
//  }
//};

exports.run = (client, msg, [action, key, ...value]) => {
  if (action === "list") {
    msg.channel.sendCode("json", util(msg.guildConf));
  } else

  if (action === "get") {
    if (!key) return msg.reply("Please provide a key you wish to view");
    msg.reply(`The value for ${key} is currently: ${msg.guildConf[key]}`);
  } else

  if (action === "set") {
    if (!key || value[0] === undefined) return msg.reply("Please provide both a key and value!");
    const type = value[0].constructor.name;
    if (["TextChannel", "GuildChannel", "Message", "User", "GuildMember", "Guild", "Role", "VoiceChannel", "Emoji", "Invite"].includes(type)) {
      value = value[0].id;
    } else {
      value = value.join(" ").toString();
    }
    client.funcs.confs.set(msg.guild, key, value);
    if (msg.guildConf[key].constructor.name === "Array") {
      if (msg.guildConf[key].includes(value)) {
        return msg.reply(`The value ${value} for ${key} has been added.`);
      }
      return msg.reply(`The value ${value} for ${key} has been removed.`);
    }
    return msg.reply(`The value for ${key} has been set to: ${value}`);
  } else

  if (action === "reset") {
    if (!key) return msg.reply("Please provide a key you wish to reset");
    client.funcs.confs.resetKey(msg.guild, key);
    return msg.reply("The key has been reset.");
  }
  return false;

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').send('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      fields: [{
          name: "Command Content",
          value: `\`${msg.content}\``,
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.avatarURL
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["config"],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "conf",
  description: "Define per-server configuration.",
  usage: "<set|get|reset|list> [key:str] [boolean:boolean|channel:channel|user:user|role:role|int:int|str:str]",
  usageDelim: " ",
};
