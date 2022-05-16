const client = require("../index");
const { Collection } = require('discord.js');
const ms = require('ms');
const { prefix } = require('../config.json')

const Timeout = new Collection();

client.on("messageCreate", async(message) => {
            try {
                if (
                    message.author.bot ||
                    !message.guild ||
                    !message.content.toLowerCase().startsWith(prefix)
                )
                    return;

                const [cmd, ...args] = message.content
                    .slice(prefix.length)
                    .trim()
                    .split(/ +/g);

                const command = client.commands.get(cmd.toLowerCase());

                if (!command) return message.channel.send({
                    content: 'Incorrect Command!'
                });
                if (command) {
                    if (command.timeout) {
                        if (Timeout.has(`${command.name}${message.author.id}`)) return message.reply(`Cooldown \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\``)
                    }
                    command.run(client, message, args);
                    Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
                    setTimeout(() => {
                        Timeout.delete(`${command.name}${message.author.id}`)
                    }, command.timeout)
                }
    } catch (e) {
        console.log(e);
        message.channel.send({
            content: 'Incorrect command'
        })
    }
});