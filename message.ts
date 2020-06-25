import Discord, { Message, MessageAttachment } from 'discord.js';
import { ping } from './discord/message.ping';
import { messageServers } from './discord/message.servers';
import { messageCharacters } from './discord/message.characters';
import { apiLogger } from './modules/logger';
import { messageTimeline } from './discord/message.timeline';
import { canvasInfo } from './modules/canvas.info';
import { messageInfo } from './discord/message.info';
import { messageSimpleInfo } from './discord/message.simpleInfo';

const prefix = '$';

export const onMessageHandle = async (message: Discord.Message) => {
  if (!message.content.startsWith(prefix)) return;

  const withoutPrefix = message.content.slice(prefix.length);
  const split = withoutPrefix.split(/ +/);
  const command = split[0];
  const args = split.slice(1);
  
  console.log(command);

  switch (command) {
    case 'ping': return ping(message);
    case 'servers': return await messageServers(message, args).then(() => apiLogger.log({ level: 'info', message: `call servers: ${message.author.username} ${message.author.discriminator}`}));
    case 'characters': return await messageCharacters(message, args).then(() => apiLogger.log({ level: 'info', message: `call characters: ${message.author.username} ${message.author.discriminator}`}));
    case 'timeline': return await messageTimeline(message, args).then(() => apiLogger.log({ level: 'info', message: `call timeline: ${message.author.username} ${message.author.discriminator}`}));
    case 'info': return messageInfo(message, args).then(() => apiLogger.log({ level: 'info', message: `call info: ${message.author.username} ${message.author.discriminator}`}));
    case 'simpleInfo': return messageSimpleInfo(message, args).then(() => apiLogger.log({ level: 'info', message: `call simpleInfo: ${message.author.username} ${message.author.discriminator}`}));
  }
};
