const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'create',
    description: 'creates a new short URL',
  },
];

const rest = new REST({ version: '10' }).setToken('MTE1ODM2NTUzNzAzOTA0MDU1Mg.GOaTAf.s_LGLFwiLzBomeYUVkceiqa5R7pmR4LAXJ0Lgw');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands('1158365537039040552'), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    
})();