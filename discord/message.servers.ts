import Discord from 'discord.js';
import { asyncGetServers } from '../db/serverList';
import { getServerIdByName } from '../modules/server';

export const messageServers = async (msg: Discord.Message, args: string[] = []) => {
  const servers = await asyncGetServers();
  if (args.length === 0) {
    const serverString = servers.map(server => server.name).join(', ');
    msg.reply(`\`${serverString}\``);
    return;
  }

  const serverIds = args.map(arg => getServerIdByName(servers, arg));
  msg.reply(`\`[${serverIds.join(', ')}]\``);
};
