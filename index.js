const { Client, Collection} = require('discord.js');
const { readdirSync } = require('fs')
const { token } = require('./config.json')

const client = new Client({ intents: 32767})

module.exports = client;

client.commands = new Collection();

const handle = readdirSync('./handlers')
handle.forEach(handle => require(`./handlers/${handle}`)(client))
client.login(token)