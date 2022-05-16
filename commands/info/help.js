const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { prefix } = require('../../config.json')

module.exports = {
    name: 'help',
    description: 'Show Bot Commands',
    permission: 'user',

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const a = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                name: 'All Commands and Description',
                iconURL: 'https://media.giphy.com/media/1TGke2Ba9nbisAXQsJ/giphy.gif'
            })
            .setTitle(`${prefix}<command> to use Command!`)
            .setTimestamp()
            .setFooter({
                text: '(a): for admin || Some Role user need role or permission to use!'
            })
            .setThumbnail(`${message.author.avatarURL()}`)

        readdirSync('./commands').map(dir => {
          readdirSync(`./commands/${dir}`).map(cmd => {
            const pull = require(`${__dirname}/../${dir}/${cmd}`)

            a.addField(`${pull.name} (${pull.permission[0]})`, `\`${pull.description}\``, true)
          })
        })

        message.channel.send({
            embeds: [a]
        })
    }
}