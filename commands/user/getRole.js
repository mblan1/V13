const { Client, Message, MessageEmbed, Guild } = require('discord.js');
const {prefix} = require('../../config.json')
module.exports = {
    name: 'role',
    description: 'Assign or remove role',
    timeout: 30000,
    permission: 'user',

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!args[0]) {
            helpGetRole(client, message);
        } else {
            getRoleByID(client, message, args[0])
        }
    }
}

const roleList = [{
    name: '🎨 Phép Thuật WinX',
    role: 'Gaming',
    id: '913755266468679700'
},
{
    name: '🌙 Những chú Cuội',
    role: 'Gaming',
    id: '855885082543783957'

},
{
    name: '👀 ơ',
    role: 'Voice',
    id: '960555679507173446'

},
{
    name: '🔐 UwU',
    role: 'UwU',
    id: '943483891677814784'

},

]

function helpGetRole(client, message) { 
    const a = new MessageEmbed()
        .setColor('AQUA')
        .setAuthor({
            name: 'Role you can assign!',
            iconURL: 'https://media.giphy.com/media/PUyO4KmKWX5D2MzH3w/giphy.gif'
        })
        .setTimestamp()
        .setFooter({
            text: `Usage: ${prefix}role <number>`
        })
    roleList.forEach((role, index) => {
        a.addField(`Role number: ${index}`, `\`${role.name}\``, true)
        
    })

    message.channel.send({
        embeds: [a]
    })    
}

function getRoleByID(client, message, input) {
    const b = new MessageEmbed()
        .setColor('RED')
        .setTitle('Incorrect Command')
        .setFooter({
            text: `${prefix}role to see full details`
        })
    if(isNaN(input)) return message.reply({
        embeds: [b.setDescription(`Usage: \`${prefix}role <number of role>\``)]
    })
    if(input > roleList.length) return message.reply(`Number from 0 to ${roleList.length - 1}`)
    if(input) {
        const roleItem = roleList[input]
        const role = message.guild.roles.cache.get(roleItem.id)
        const curRole = message.member.roles.cache.some(r => r.id === roleItem.id)
        if(curRole) {
            message.member.roles.remove(role)
            message.reply(`You are not longer have \`${roleItem.name}\` role!`)
        } else {
            message.member.roles.add(role)
            message.reply(`Assigned \`${roleItem.name}\` role!`)
        }
    }
    // roleList.forEach((role, index) => {

    // })
}