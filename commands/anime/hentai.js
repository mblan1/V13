const  { Client, Message, MessageEmbed} = require('discord.js');
const API = require('anime-images-api');
const image_api = new API()

module.exports = {
    name: 'hentai',
    description: 'anime image',
    timeout: 5000,
    permission: 'UwU Role',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            const uwuRole = message.guild.roles.cache.some(roleID => roleID === '943483891677814784')

            if(!uwuRole) return message.reply('You dont have `UwU Role` to use this command!')
        const channelID = client.channels.cache.get('943484762016866335')
        channelID.send('Working on it!')

        const a = new MessageEmbed()
            .setColor('PURPLE')
            .setFooter({
                text: 'Just for fun haha'
            })
            .setTimestamp()


        image_api.nsfw.hentai().then(res => {
            a.setDescription(`UwU`)
            a.setImage(res.image)

            channelID.send({
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
