// main.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const initDB = require('./lib/database.js');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: 'auth' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

const plugins = [];

// Load plugins
const pluginFiles = fs.readdirSync(path.join(__dirname, 'plugins')).filter(file => file.endsWith('.js'));

for (const file of pluginFiles) {
  const plugin = require(`./plugins/${file}`);
  plugins.push(plugin);
}

client.on('qr', qr => {
  console.log("📱 Scan QR Code:");
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot is ready!');
});

client.on('message', async message => {
  if (!message.body.startsWith(config.prefix)) return;

  const args = message.body.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const plugin = plugins.find(p => p.name === command);
  if (plugin) {
    try {
      const db = await initDB();
      await plugin.execute({ client, message, args, db });
    } catch (err) {
      console.error("⚠️ Plugin error:", err);
      await message.reply("⚠️ Plugin crashed.");
    }
  }
});

client.initialize();
