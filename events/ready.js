const client = require("../index");
const { token } = require('../config.json')

client.on("ready", () => {
    console.log(`${client.user.username} is up and ready to go!`);

    client.user.setPresence({
        activity: {
            name: 'Hihi',
            type: 'WATCHING'
        },
        status: 'idle',
    });
    client.user.setActivity(`hihi`);

});