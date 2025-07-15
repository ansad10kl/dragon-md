// plugins/menu.js

const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  description: 'Lists all commands',
  execute: async ({ message }) => {
    const pluginDir = path.join(__dirname);
    const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

    let menu = '📜 *Available Commands:*\n\n';
    for (const file of files) {
      const plugin = require(`./${file}`);
      menu += `• *${plugin.name}* – ${plugin.description}\n`;
    }

    await message.reply(menu);
  }
};
