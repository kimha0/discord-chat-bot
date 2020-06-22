import Discord from 'discord.js';

export const ping = (msg: Discord.Message) => msg.reply('pong');