import axios from 'axios';

interface Clone {
  itemId?: any;
  itemName?: any;
}

interface Artifact {
  slotColor: string;
  itemName: string;
  itemAvailableLevel: number;
  itemRarity: string;
}

interface Creature {
  itemId: string;
  itemName: string;
  itemRarity: string;
  clone: Clone;
  artifact: Artifact[];
}

interface CreatureApiResponse {
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
  creature: Creature;
}




const getCharacterCreature = async (characterId: string, serverId: string): Promise<CreatureApiResponse> => await axios
  .get<CreatureApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/creature?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterCreature };