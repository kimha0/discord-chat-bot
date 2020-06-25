import axios from 'axios';
interface Active {
  skillId: string;
  name: string;
  level: number;
  requiredLevel: number;
}

interface Passive {
  skillId: string;
  name: string;
  level: number;
  requiredLevel: number;
}

interface Style {
  active: Active[];
  passive: Passive[];
}

interface Skill {
  style: Style;
}

interface SkillStyleApiResponse {
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


const getCharacterSkillStyle = async (characterId: string, serverId: string): Promise<SkillStyleApiResponse> => await axios
  .get<SkillStyleApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/skill/style?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterSkillStyle };