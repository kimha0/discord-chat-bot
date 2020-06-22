import Discord, { Message } from 'discord.js';
import { ping } from './discord/message.ping';
import { messageServers } from './discord/message.servers';
import { messageCharacters } from './discord/message.characters';
import { apiLogger } from './modules/logger';

const prefix = '$';

export const onMessageHandle = async (message: Discord.Message) => {
  if (!message.content.startsWith(prefix)) return;

	const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
  const args = split.slice(1);
  
  switch(command) {
    case 'ping'       : return ping(message);
    case 'servers'    : return await messageServers(message, args);
    case 'characters' : return await messageCharacters(message, args).catch(e => console.log(e));
  }
};
