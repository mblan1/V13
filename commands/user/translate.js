const translate = require('@iamtraction/google-translate');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'translate',
    description: 'Translate language',
    timeout: 3000,
    permission: 'user',

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const a = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Translate Language')
        
        const lang = args[0];
        if(!lang) return message.reply('Type language you want to translate to')
        
        const string = args.slice(1).join(' ');
        if(!string) return message.reply('Type something');

        translate(string, {
            to: lang,
        }).then(res => {

            a.setDescription(`\`${string}\` to \`${lang}\`: \`${res.text}\``)

            message.channel.send({
                embeds: [a]
            })
        }).catch(e => {
            console.log(e);
            message.channel.send('Error')
        })
    }
}