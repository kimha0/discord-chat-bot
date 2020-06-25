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
  value: number;
}

interface ReinforceSkill {
  jobId: string;
  jobName: string;
  skills: Skill2[];
}

interface Enchant {
  reinforceSkill: ReinforceSkill[];
}

interface Equipment {
  slotId: string;
  slotName: string;
  itemId: string;
  itemName: string;
  itemType: string;
  itemTypeDetail: string;
  itemAvailableLevel: number;
  itemRarity: string;
  setItemId: string;
  setItemName: string;
  reinforce: number;
  amplificationName?: any;
  refine: number;
  enchant: Enchant;
}

interface Buff {
  skillInfo: SkillInfo;
  equipment: Equipment[];
}

interface Skill {
  buff: Buff;
}

interface SkillBuffEquipmentApiResponse {
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




const getCharacterSkillBuffEquipment = async (characterId: string, serverId: string): Promise<SkillBuffEquipmentApiResponse> => await axios
  .get<SkillBuffEquipmentApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/equipment?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterSkillBuffEquipment };