import axios from 'axios';

interface TalismanSlot {
  slotNo: number;
  itemId: string;
  itemName: string;
  runeTypes: string[];
}

interface Rune {
  slotNo: number;
  itemId: string;
  itemName: string;
}

interface Talisman {
  talisman: TalismanSlot;
  runes: Rune[];
}

interface TalismanApiResponse {
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
  talismans: Talisman[];
}


const getCharacterTalisman = async (characterId: string, serverId: string): Promise<TalismanApiResponse> => await axios
  .get<TalismanApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/talisman?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterTalisman };