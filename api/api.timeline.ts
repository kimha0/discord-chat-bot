import axios from 'axios';

interface TimelineDate {
  start: string;
  end: string;
}

interface Data {
  raidName: string;
  phaseName: string;
  itemId: string;
  itemName: string;
  itemRarity: string;
  channelName: string;
  channelNo: number;
  dungeonName: string;
  guide: boolean;
  before: number;
  after: number;
  result: number;
}

export interface Row {
  code: number;
  name: string;
  date: string;
  data: Data;
}

interface Timeline {
  date: TimelineDate | null;
  next: string;
  rows: Row[];
}

interface TimeLineResponse {
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
  timeline: Timeline;
}

interface FilterDate {
  startDate: string,
  endDate: string,
}

export interface TimelineOption {
  filterDate?: FilterDate
  limit?: number,
  code?: string,
  next?: string,
}

const getTimeLine = async (characterName: string, serverId: string, option: TimelineOption = {}): Promise<TimeLineResponse> => {
  let url = `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterName}/timeline?apikey=${process.env.DNF_API_TOKEN}`;

  if (option.code) url += `&code=${option.code}`;
  if (option.filterDate) url += `&startDate=${option.filterDate.startDate}&endDate=${option.filterDate.endDate}`;
  if (option.limit) url += `&limit=${option.limit}`;
  if (option.next) url += `&next=${option.next}`;

  return await axios
    .get<TimeLineResponse>(url)
    .then(response => response.data);
}

export { getTimeLine };