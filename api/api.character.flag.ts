import axios from 'axios';

interface Gem {
  slotNo: number;
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemAbility: string;
}

interface Flag {
  itemId: string;
  itemName: string;
  itemAvailableLevel: number;
  itemRarity: string;
  reinforce: number;
  itemAbility: string;
  gems: Gem[];
}

interface FlagApiResponse {
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
  flag: Flag;
}


const getCharacterFlag = async (characterId: string, serverId: string): Promise<FlagApiResponse> => await axios
  .get<FlagApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/flag?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterFlag };