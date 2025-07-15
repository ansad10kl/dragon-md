// plugins/ping.js

module.exports = {
  name: 'ping',
  description: 'Bot status check',
  execute: async ({ message }) => {
    const start = Date.now();
    const sent = await message.reply('Pinging...');
    const end = Date.now();
    await sent.edit(`🏓 Pong! ${end - start}ms`);
  }
};
