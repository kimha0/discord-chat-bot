import Discord from 'discord.js';
import { onMessageHandle } from './message';
import express from 'express';

async function main() {
  const client = new Discord.Client();
  const app = express();
  const port = process.env.PORT || 3000;

  client.on('ready', () => console.log(`Logged in as ${client.user?.tag ?? ''}!`));
  client.on('message', onMessageHandle);
  client.login(process.env.DISCORD_API_TOKEN);

  app.get('/', (req, res) => res.send('dnf chat bot'));
  
  app.listen(port, () => console.log(`express running at ${port}`));
};


main();