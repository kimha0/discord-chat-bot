import axios from 'axios';

interface Character {
  serverId: string;
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
}

interface Characters {
  rows: Character[];
}



interface DNFCharacter {
  serverId: string;
  id: string;
  name: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
};

type DNFCharacters = DNFCharacter[];

const getCharacters = async (characterName: string, serverId: string = 'all'): Promise<DNFCharacters> => await axios
  .get<Characters>(`https://api.neople.co.kr/df/servers/${serverId}/characters?characterName=${characterName}&apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data)
  .then(data =>
    data.rows.map(e => ({
      serverId: e.serverId,
      id: e.characterId,
      name: e.characterName,
      level: e.level,
      jobId: e.jobId,
      jobGrowId: e.jobGrowId,
      jobName: e.jobName,
      jobGrowName: e.jobGrowName,
    }))
  );

export { getCharacters, DNFCharacters, DNFCharacter };