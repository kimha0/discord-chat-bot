import axios from 'axios';

interface Enchant {
  explain: string;
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
  itemGradeName: string;
  amplificationName?: any;
  refine: number;
  enchant: Enchant;
  expiredDate?: number;
}

interface SlotInfo {
  slotId: string;
  slotName: string;
  itemRarity: string;
}

interface SetItemInfo {
  setItemId: string;
  setItemName: string;
  slotInfo: SlotInfo[];
  activeSetNo: number;
}

interface EquipmentApiResponse {
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
  equipment: Equipment[];
  setItemInfo: SetItemInfo[];
}


const getCharacterEquipment = async (characterId: string, serverId: string): Promise<EquipmentApiResponse> => await axios
  .get<EquipmentApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/equipment?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterEquipment };