const  { Client, Message, MessageEmbed} = require('discord.js');
const API = require('anime-images-api');
const { prefix } = require('../../config.json')

const image_api = new API()

module.exports = {
    name: 'punch',
    description: 'Punch by anime image',
    usage: `${prefix}punch <tag member>`,
    timwout: 5000,
    permission: 'user',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            const memTag = message.mentions.members.first();
        if(!memTag) return message.reply('Please tag a member!')

        message.channel.send('Working on it!')

        const a = new MessageEmbed()
            .setColor('PURPLE')
            .setFooter({
                text: 'Just for fun haha'
            })
            .setTimestamp()


        image_api.sfw.punch().then(res => {
            a.setDescription(`${memTag} has just been punched by <@${message.author.id}>`)
            a.setImage(res.image)

            message.reply({
                content: 'Ting Ting!!!',
                embeds: [a]
            })
        })  
        } catch (e) {
            console.log(e);
            message.channel.send('Error')
        }
    }
}
