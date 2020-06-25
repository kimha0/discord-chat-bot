import axios from 'axios';

export interface Status {
  name: string;
  value: number;
}

interface Buff {
  name: string;
  level: number;
  status: Status[];
}

interface StatusApiResponse {
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
  buff: Buff[];
  status: Status[];
}


const getCharacterStatus = async (characterId: string, serverId: string): Promise<StatusApiResponse> => await axios
  .get<StatusApiResponse>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/status?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data);

export { getCharacterStatus };