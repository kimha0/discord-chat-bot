import Discord from 'discord.js';

import { asyncGetServers } from '../db/serverList';
import { getCharacters, DNFCharacter, DNFCharacters } from '../api/api.characters';
import { getServerNameById, getServerIdByName } from '../modules/server';
import { escape } from '../modules/encodeString';
import { DNFServers } from '../api/api.servers';
import { DOUBLE_BYTE_SPACE } from '../modules/constants';
import { asyncSetUser } from '../db/userList';

const getStringByCharacter = (character: DNFCharacter, servers: DNFServers) =>
  `\`${getServerNameById(servers, character.serverId)}-${character.name} ${character.level}lv ${character.jobGrowName}(${character.jobName})\``;

const getStringByCharacters = (characters: DNFCharacters, servers: DNFServers) => characters
  .map(character =>
    `${getServerNameById(servers, character.serverId).padEnd(6, DOUBLE_BYTE_SPACE)} ${character.name} ${character.level.toString().padEnd(3)} ${character.jobName.padEnd(8, DOUBLE_BYTE_SPACE)} ${character.jobGrowName}`
  )
  .join('\n');

export const messageCharacters = async (msg: Discord.Message, args: string[] = []) => {
  const servers = await asyncGetServers();
  const [characterName, serverName] = args;
  if (characterName === '' || characterName === undefined || characterName === null) {
    msg.reply(`\`$character <character name> <server id (optional)>\``);
    return;
  }

  const escapeCharacterName = escape(characterName);

  let serverId: string | undefined = undefined;

  if (serverName) {
    serverId = await getServerIdByName(servers, serverName);
    const characters = await getCharacters(escapeCharacterName, serverId);

    if (characters.length === 0) {
      msg.reply(`닉네임을 찾을 수 없습니다`);
      return;
    }

    const character = characters[0];
    const response = getStringByCharacter(character, servers)

    msg.reply(response);
    await asyncSetUser({ id: character.id, name: character.name, serverId: serverId, serverName: serverName });
    return;
  }

  const characters = await getCharacters(escapeCharacterName);
  const response = getStringByCharacters(characters, servers);

  msg.reply(`\`\`\`${response}\`\`\``);
  const promise = characters.map(character => asyncSetUser({ id: character.id, name: character.name, serverId: character.serverId, serverName: getServerNameById(servers, character.serverId) }))
  await Promise.all(promise);

  return;
};

