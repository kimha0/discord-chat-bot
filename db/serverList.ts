import { getServerList, DNFServers } from '../api/api.servers';
import redis from './redis';
import { redisLogger } from '../modules/logger';

const asyncGetServers = async () => {
  const result = await redis.get('servers');

  if (result) {
    redisLogger.log({ level: 'info', message: `redis server: ${result}`});
    return <DNFServers>JSON.parse(result);
  }

  return await getServerList().then(servers => {
    redis.set('servers', JSON.stringify(servers));
    return servers;
  });


}

export { asyncGetServers };
