import axios from 'axios';
interface Option {
  level: number;
  desc: string;
  values: string[];
}

interface SkillInfo {
  skillId: string;
  name: string;
  option: Option;
}

interface Emblem {
  slotNo: number;
  slotColor: string;
  itemName: string;
  itemRarity: string;
}

interface Avatar {
  slotId: string;
  slotName: string;
  itemId: string;
  itemName: string;
  itemRarity: string;
  cloneAvatarName?: any;
  optionAbility: string;
  emblems: Emblem[];
}

interface Buff {
  skillInfo: SkillInfo;
  avatar: Avatar[];
}

interface Skill {
  buff: Buff;
}

interface SkillBuffAvatarApiResponse {
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  adventureName: string;
  guildId: string;
  guildName: string;
  skill: Skill;
}



const getCharacterSkillBuffAvatar = async (characterId: string, serverId: string): Promise<SkillBuffAvatarApiResponse> => await axios
  .get<SkillBuffAvatarApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/avatar?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterSkillBuffAvatar };