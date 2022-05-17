const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync, read } = require('fs');
const { prefix } = require('../../config.json')

module.exports = {
    name: 'help',
    description: 'Show Bot Commands',
    permission: 'user',
    timeout: 3000,

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!args[0]) return getALL(client, message);

        if(args[0]) return getCMD(client, message, args[0])
    }
}

function getALL(client, message) {
    const a = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({
                name: 'All Commands and Description',
                iconURL: 'https://media.giphy.com/media/1TGke2Ba9nbisAXQsJ/giphy.gif'
            })
            .setTitle(`(a): for admin || Some Role user need role or permission to use!`)
            .setTimestamp()
            .setFooter({
                text: `${prefix}<help> <command> to see command's detail`
            })
            .setThumbnail(`${message.author.avatarURL()}`)

        readdirSync('./commands').map(dir => {
          readdirSync(`./commands/${dir}`).map(cmd => {
            const pull = require(`${__dirname}/../${dir}/${cmd}`)
            
            a.addField(`${pull.name} (${pull.permission && pull.permission[0]})`, `\`${pull.description}\``, true)
          })
        })

        message.channel.send({
            embeds: [a]
        })
}

function getCMD(client, message, input) {
    const a = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase())
    let info = `Could not found command! \`${input.toLowerCase()}\``;
    if(!cmd) return message.channel.send({
        embeds: [a.setColor('RED').setDescription(`${info}`)]
    })
     if (cmd.name) info = `Command name: \`${cmd.name}\`\n`;
     if(cmd.description) info += `Description: \`${cmd.description}\`\n`
     if(cmd.usage) info += `How to use: \`${cmd.usage}\`\n`
     if(cmd.permission) info += `User/Role can use this command: \`${cmd.permission}\`\n`

     return message.channel.send({
         embeds: [a.setColor('GREEN').setDescription(info).setFooter({
             text: 'From Admin with Love <3'
         })]
     })
}