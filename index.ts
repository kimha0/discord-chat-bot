import Discord from 'discord.js';
import { onMessageHandle } from './message';


async function main() {
  const options = {
  };

  const client = new Discord.Client();

  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag ?? ''}!`);
  });
  
  client.on('message', onMessageHandle);

  client.login(process.env.DISCORD_API_TOKEN);
};


main();