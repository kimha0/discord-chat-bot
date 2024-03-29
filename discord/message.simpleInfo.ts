import Discord, { MessageAttachment } from 'discord.js';

import { asyncGetServers } from '../db/serverList';
import { getServerIdByName } from '../modules/server';
import { escape } from '../modules/encodeString';
import { getCharacters } from '../api/api.characters';
import { getCharacterStatus } from '../api/api.character.status';
import { getSimpleInfoBuffer } from '../modules/canvas.simpleInfo';


const guideMessage = `\`$simpleInfo <name> <server>\``;


export const messageSimpleInfo = async (msg: Discord.Message, args: string[] = []) => {
  const servers = await asyncGetServers();
  const [characterName, serverName] = args;
  if (serverName === '' || serverName === undefined || serverName === null) {
    msg.reply(guideMessage);
    return;
  }

  const serverId = getServerIdByName(servers, serverName);
  if (serverId === 'unk') {
    msg.reply(`서버명이 잘못 됨. ${guideMessage}`);
    return;
  }

  if (characterName === '' || characterName === undefined || characterName === null) {
    msg.reply(guideMessage);
    return;
  }

  const character = await getCharacters(escape(characterName), serverId);

  if (character.length === 0) {
    msg.reply(`캐릭터를 찾을 수 없음. ${guideMessage}`);
    return;
  }

  const characterId = character[0].id;

  const escapeCharacterId = escape(characterId);
  const escapeServerId = escape(serverId);

  const status = await getCharacterStatus(escapeCharacterId, escapeServerId);

  const buffer = await getSimpleInfoBuffer({
    characterId: status.characterId,
    characterName: status.characterName,
    adventureName: status.adventureName,
    guildName: status.guildName,
    level: status.level,
    jobGrowName: status.jobGrowName,
    serverId,
    serverName,
  });



  const attachment = new MessageAttachment(buffer, `${serverName}-${characterName}.png`);
  msg.reply(attachment);
  return;
};

