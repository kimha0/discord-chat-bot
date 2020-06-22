import Discord from 'discord.js';
import { servers } from '../rxjs/serverList';
import { getServerIdByName } from '../modules/server';

export const messageServers = async (msg: Discord.Message, args: string[] = []) => {
  if (args.length === 0) {
    const serverString = servers.map(server => server.name).join(', ');
    msg.reply(`\`${serverString}\``);
    return;
  }

  const serverIds = args.map(arg => getServerIdByName(servers, arg));
  msg.reply(`\`serverId: [${serverIds.join(', ')}]\``);
};
