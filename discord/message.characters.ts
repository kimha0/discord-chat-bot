import Discord from 'discord.js';

import { servers } from '../rxjs/serverList';
import { getCharacters, DNFCharacter, DNFCharacters } from '../api/api.characters';
import { getServerNameById } from '../modules/server';
import { escape } from '../modules/encodeString';

const getStringByCharacter = (character: DNFCharacter) =>
`\`\`\`서버: ${getServerNameById(servers, character.serverId)}
이름: ${character.name}
레벨: ${character.level}
직업: ${character.jobName}
각성: ${character.jobGrowName}\`\`\``;

const getStringByCharacters = (characters: DNFCharacters) => characters.map(character => `[${getServerNameById(servers, character.serverId)}, ${character.name}, ${character.level}, ${character.jobName}, ${character.jobGrowName}]`).join('\n');

export const messageCharacters = async (msg: Discord.Message, args: string[] = []) => {
  const [characterName, serverName] = args;
  if (characterName === '' || characterName === undefined || characterName === null) {
    msg.reply(`\`$character <character name> <server id (optional)>\``);
    return;
  }

  const escapeCharacterName = escape(characterName);
  const escapeServerName = serverName ? escape(serverName) : undefined;

  const characters = await getCharacters(escapeCharacterName, escapeServerName);

  if (characters.length === 0) {
    msg.reply(`해당 닉네임을 찾을 수 없습니다?`);
    return;
  }

  if (characters.length === 1) {
    const response = characters.map(character => getStringByCharacter(character));
    msg.reply(response);
    return;
  }

  const response = getStringByCharacters(characters);
  msg.reply(response);
  return;
};

