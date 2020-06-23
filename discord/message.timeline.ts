import Discord from 'discord.js';

import { servers } from '../rxjs/serverList';
import { getServerIdByName } from '../modules/server';
import { escape } from '../modules/encodeString';
import { getTimeLine, Row as TimelineRow } from '../api/api.timeline';
import { getDefaultDateString } from '../modules/timeFormat';
import { getCharacters } from '../api/api.characters';


const guideMessage = `\`$timeline <name> <server> <(optional) dungeon | enchant | item>\``;

const getCodeByParam = (param: string | undefined) => {

  switch (param) {
    case 'dungeon': {
      return escape('201,207');
    }
    case 'enchant': {
      return escape('401,402,403');
    }
    case 'item': {
      return escape('501,502,503,504,505,506,507,508,509,510,511,512,513,514');
    }
    default: {
      return undefined;
    }
  }
};

const parseTimelineRow = (row: TimelineRow) => {
  switch (row.code) {
    case 201: return `${getDefaultDateString(row.date)} ${row.data.raidName.padEnd(15, '  ')}  ${row.data.phaseName ?? ''}\n`;
    case 207: return `${getDefaultDateString(row.date)} ${row.name.padEnd(15, ' ')} ${row.data.guide ? '**가이드**' : ''}\n`;
    case 401:
    case 402:
    case 403: return `${getDefaultDateString(row.date)} ${row.name} ${row.data.itemName} ${row.data.before} -> ${row.data.after} ${row.data.result ? '성공' : 'failure\n'}`
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
    case 506:
    case 507:
    case 508:
    case 509:
    case 510:
    case 511:
    case 512:
    case 513:
    case 514: return `${getDefaultDateString(row.date)} ${row.data.itemName.padEnd(15, '  ')} ${row.name}\n`;
    default: return ``;
  }
}

export const messageTimeline = async (msg: Discord.Message, args: string[] = []) => {
  const [characterName, serverName, param] = args;
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

  



  const code = getCodeByParam(param);
  const escapeCharacterId = escape(characterId);
  const escapeServerId = escape(serverId);
  const timeLine = await getTimeLine(escapeCharacterId, escapeServerId, { code });

  const timeLineMessages = timeLine.timeline.rows.map(row => parseTimelineRow(row));

  if (timeLineMessages.length === 0) {
    msg.reply(`해당 캐릭터는 타임라인이 없습니다.`);
    return;
  }

  msg.reply(`\`\`\`${timeLineMessages.join('').slice(0, -1)}\`\`\``);
  return;
};

