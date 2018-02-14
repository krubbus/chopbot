exports.run = async (client, msg, [target, ...reason]) => {
    //Making sure target is fetched, and setting the executor
    target = await client.users.resolve(target.id);
    const executor = msg.author;
    const action = "VC Unban";
    reason = reason.join(" ");

    //Checking to see if executor can act on target
    const canMod = await client.funcs.hierarchyCheck(client, executor, target, msg.guild).catch((err) => {
        msg.delete();
        return msg.reply(`<:cbotX:413463891998146560> It looks like you don't have permission to moderate ${target}. Are they in this server?`);
    });

    //Notify if user can't moderate target
    if (!canMod) {
        msg.delete();
        return msg.reply(`<:cbotX:413463891998146560> You don't have permission to moderate ${target}.`);
    }

    if (msg.content.includes ("-s")) {
        //Run silently if specified
        await client.funcs.modNotification(client, executor, target, msg, action, reason, true);
    } else {
        //Run normally
        await client.funcs.modNotification(client, executor, target, msg, action, reason, false);
    }

    /**  ~~~~   Action-specific Code starts here   ~~~~  **/

    //Nothing to do here as warning messages are handled by modNotification function
    return msg.guild.member(target).roles.remove(msg.guild.settings.voiceBannedRole)
        .catch((err) => msg.reply(`⚠️ There was an error trying to unban ${target} from voice chat: ${err}.`));

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["vunban", "vub", "vcunban"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "vcunban",
    description: "Unbans mentioned user from server's voice channels.",
    usage: "<user:user>",
    usageDelim: ""
};
