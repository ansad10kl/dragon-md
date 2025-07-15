// plugins/alive.js

module.exports = {
  name: 'alive',
  description: 'Check if bot is alive',
  execute: async ({ message }) => {
    await message.reply('✅ I am alive and working perfectly, bro!');
  }
};
