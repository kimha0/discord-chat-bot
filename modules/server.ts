import { DNFServers } from '../api/api.servers';

export const getServerIdByName = (list: DNFServers, name: string) => {
  const server = list.find(server => server.name === name);
  return server?.id ?? 'unk';
};

export const getServerNameById = (list: DNFServers, id: string) => {
  const server = list.find(server => server.id === id);
  return server?.name ?? 'unk';
};
