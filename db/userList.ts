import redis from './redis';
import { getServerIdByName } from '../modules/server';
import { getDetailCharacter } from '../api/api.character';
import { asyncGetServers } from './serverList';
import { redisLogger } from '../modules/logger';


interface User {
  id: string,
  name: string,
  serverId: string,
  serverName: string,
  characterImage?: string,
};


const asyncGetUser = async (name: string, serverName: string) => {
  const key = encodeURI(`${serverName} ${name}`);
  console.log(key)
  const result = await redis.get(key);
  if (result) {
    redisLogger.log({ level: 'info', message: `redis user: ${result}` });
    return <User>JSON.parse(result);
  }

  const serverList = await asyncGetServers();
  const serverId = getServerIdByName(serverList, serverName);

  return await getDetailCharacter(name, serverId).then(response => {
    const user: User = {
      id: response.id,
      name: response.name,
      serverId: serverId,
      serverName: serverName,
    };

    asyncSetUser(user);
    return user;
  });
}

const asyncSetUser = async (user: User) => {
  const key = encodeURI(`${user.serverName} ${user.name}`);
  const stringifyUser = JSON.stringify(user);
  redisLogger.log({ level: 'info', message: `redis set user: ${stringifyUser}` });
  await redis.set(key, stringifyUser);
}



export { asyncGetUser, asyncSetUser };
