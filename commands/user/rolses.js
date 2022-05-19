const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'myroles',
    description: 'List all your roles',
    permission: 'user',
    timeout: 5000,


    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let count = 0;
        const a = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('All roles you have!')
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
        message.member.roles.cache.some(role => {
            count ++;
            a.addField(`Role ${count}`,`\`${role.name}\``)
        })

        message.channel.send({
            embeds: [a]
        })
    }
}