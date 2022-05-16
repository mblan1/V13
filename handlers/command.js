const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const { readdirSync } = require('fs')



module.exports = async(client) => {
    /**
     * @param {Client} client
     */
    // Commands
    let count = 0;
    readdirSync('./commands').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                count++;
                client.commands.set(pull.name, pull);
            } else {
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    })
    console.log(`${count} command(s) are ready!`);


    // mongoose
    // const { mongooseConnectionString } = require('../config.json')
    // if (!mongooseConnectionString) return;

    // mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));
};