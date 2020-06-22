import axios from 'axios';


interface Server {
  serverId: string;
  serverName: string;
}
interface Servers {
  rows: Server[];
};

interface DNFServer {
  id: string;
  name: string;
};

type DNFServers = DNFServer[];

const getServerList = async (): Promise<DNFServers> => await axios
  .get<Servers>(`https://api.neople.co.kr/df/servers?apikey=${process.env.DNF_API_TOKEN}`)
  .then(response => response.data)
  .then(data => data.rows.map(e => ({ id: e.serverId, name: e.serverName })));

export { getServerList, DNFServers };