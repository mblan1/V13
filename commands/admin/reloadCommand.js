const { Client, Message } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'reload',
    description: 'Reload Command Bot',
    permission: 'admin',


    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            let own = message.author.id == '687683626695262245'
            if (!own) return message.channel.send({
              content: 'This command just for Admin'
            });

            client.commands.sweep(() => true)
            readdirSync(`./commands`).map(dir => {
                readdirSync(`./commands/${dir}`).map(file => {
                    const filePath = `${__dirname}/../${dir}/${file}`
                    
                    delete require.cache[require.resolve(filePath)]

                    const pull = require(filePath)
                    if (pull.name) {
                        console.log(`reloaded ${pull.name} (cmd)`)
                        client.commands.set(pull.name, pull)
            
                    }
            
                    message.channel.send({
                        content: `Reloaded command:   \`${pull.name}\` `
                    })

                })
            })
            message.channel.send({
                content: '`All commands have benn reloaded`'
            })
        } catch (e) {
            message.channel.send({
                content: 'Error'
            })            
            console.error(e)
        }
    }
}
