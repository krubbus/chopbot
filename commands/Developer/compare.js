exports.run = async (client, msg, [target]) => {
    const executor = msg.author;
    const canMod = await client.funcs.hierarchyCheck(client, executor, target, msg.guild).catch((err) => {
        if(err){
            fail("User is not in guild.", msg);
        }
    });

    if (!canMod) {
        //Notify user of command cancellation
        return msg.react("413463891998146560");
    }

    //Perform command operations
    return msg.react("413464351467634689");

};

fail = (err, msg) => {
    return msg.channel.sendMessage("Failed to execute command: " + err);
};

exports.conf = {
    enabled: true,
    selfbot: false,
    runIn: ["text"],
    aliases: [""],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: ["hierarchyCheck"],
    requiredModules: []
};

exports.help = {
    name: "compare",
    description: "Test command for hierarchyCheck function.",
    usage: "<target:user>",
    usageDelim: " ",
    type: "commands"
};
