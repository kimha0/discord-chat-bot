import axios from 'axios';

interface DetailCharacter {
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
}

interface DNFDetailCharacter {
  id: string;
  name: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  adventureName: string;
  guildId: string;
  guildName: string;
}

const getDetailCharacter = async (characterName: string, serverId: string = 'all'): Promise<DNFDetailCharacter> => await axios
  .get<DetailCharacter>(`https://api.neople.co.kr/df/servers/${serverId}/characters/${characterName}?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data)
  .then(({ characterId, characterName, ...character }) => ({
      id: characterId,
      name: characterName,
      ...character
    })
  );

export { getDetailCharacter, DNFDetailCharacter };