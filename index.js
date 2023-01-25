const { Client, GatewayIntentsBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentsBits.GUILDS,
    GatewayIntentsBits.GUILD_MESSAGES,
    GatewayIntentsBits.MESSAGECONTENT,
]});