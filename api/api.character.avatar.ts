import axios from 'axios';
interface Clone {
  itemId: string;
  itemName: string;
}

interface Random {
  itemId?: any;
  itemName?: any;
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
  clone: Clone;
  random: Random;
  optionAbility: string;
  emblems: Emblem[];
}

interface AvatarApiResponse {
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
  avatar: Avatar[];
}




const getCharacterAvatar = async (characterId: string, serverId: string): Promise<AvatarApiResponse> => await axios
  .get<AvatarApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/avatar?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterAvatar };