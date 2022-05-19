const { Client, Message } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping Bot',
    timeout: 3000,
    permission: 'user',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        message.channel.send(`Client ping: \`${client.ws.ping}ms\``)
    }
}