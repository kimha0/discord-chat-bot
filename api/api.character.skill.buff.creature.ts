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

interface Skill2 {
  skillId: string;
  name: string;
  value: string;
}

interface ReinforceSkill {
  jobId: string;
  jobName: string;
  skills: Skill2[];
}

interface Enchant {
  reinforceSkill: ReinforceSkill[];
}

interface Creature {
  itemId: string;
  itemName: string;
  itemRarity: string;
  enchant: Enchant;
}

interface Buff {
  skillInfo: SkillInfo;
  creature: Creature[];
}

interface Skill {
  buff: Buff;
}

interface SkillBuffCreatureApiResponse {
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


const getCharacterSkillBuffCreature = async (characterId: string, serverId: string): Promise<SkillBuffCreatureApiResponse> => await axios
  .get<SkillBuffCreatureApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/creature?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterSkillBuffCreature };