import Discord from 'discord.js';

import { asyncGetServers } from '../db/serverList';
import { getServerIdByName } from '../modules/server';
import { escape } from '../modules/encodeString';
// import { getDefaultDateString } from '../modules/timeFormat';
import { getCharacters } from '../api/api.characters';
import { getCharacterStatus, Status } from '../api/api.character.status';
import { getCharacterEquipment } from '../api/api.character.equipment';
import { getCharacterAvatar } from '../api/api.character.avatar';
import { getCharacterCreature } from '../api/api.character.creature';
import { getCharacterTalisman } from '../api/api.character.talisman';
import { getCharacterSkillStyle } from '../api/api.character.skill.style';
import { getCharacterSkillBuffEquipment } from '../api/api.character.skill.buff.equipment';
import { getCharacterSkillBuffAvatar } from '../api/api.character.skill.buff.avatar';
import { getCharacterSkillBuffCreature } from '../api/api.character.skill.buff.creature';
import { DOUBLE_BYTE_SPACE } from '../modules/constants';


const guideMessage = `\`$info <name> <server>\``;

const statusNameFilter = (name: string) => {
  switch (name) {
    case '힘':
    case '지능':
    case '체력':
    case '정신력':
    case '물리 공격':
    case '마법 공격':
    case '독립 공격':
    case '물리 크리티컬':
    case '마법 크리티컬':
    case '공격 속도':
    case '캐스팅 속도':
    case '이동 속도':
    case '항마':
    case '화속성 강화':
    case '수속성 강화':
    case '명속성 강화':
    case '암속성 강화': return true;
    default: return false
  }
};

const statusToString = (status: Status, index: number) => {
  switch(index) {
    case 3:
    case 6:
    case 8:
    case 12: return `${status.name} ${status.value}${DOUBLE_BYTE_SPACE}\n`;
    default: return `${status.name} ${status.value}${DOUBLE_BYTE_SPACE}`;
  }
}


export const messageInfo = async (msg: Discord.Message, args: string[] = []) => {
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

  const [status, equipment, avatar, creature, talisman, skillStyle, skillBuffEquipment, skillBuffAvatar, skillBuffCreature] = await Promise.all([
    getCharacterStatus(escapeCharacterId, escapeServerId),
    getCharacterEquipment(escapeCharacterId, escapeServerId),
    getCharacterAvatar(escapeCharacterId, escapeServerId),
    getCharacterCreature(escapeCharacterId, escapeServerId),
    getCharacterTalisman(escapeCharacterId, escapeServerId),
    getCharacterSkillStyle(escapeCharacterId, escapeServerId),
    getCharacterSkillBuffEquipment(escapeCharacterId, escapeServerId),
    getCharacterSkillBuffAvatar(escapeCharacterId, escapeServerId),
    getCharacterSkillBuffCreature(escapeCharacterId, escapeServerId),
  ]);

  const st = status.status.filter(st => statusNameFilter(st.name)).map(statusToString).join('');
  msg.reply(`\n>>> ${st}`);

  // msg.reply(JSON.stringify(status));
  // msg.reply(JSON.stringify(equipment));
  // msg.reply(JSON.stringify(avatar));
  // msg.reply(JSON.stringify(creature));
  // msg.reply(JSON.stringify(talisman));
  // msg.reply(JSON.stringify(skillStyle));
  // msg.reply(JSON.stringify(skillBuffEquipment));
  // msg.reply(JSON.stringify(skillBuffAvatar));
  // msg.reply(JSON.stringify(skillBuffCreature));



  // if (timeLineMessages.length === 0) {
  //   msg.reply(`해당 캐릭터는 타임라인이 없습니다.`);
  //   return;
  // }

  // msg.reply(`\`\`\`${timeLineMessages.join('').slice(0, -1)}\`\`\``);
  return;
};

