const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('ready', () => {
    console.log('✅ Bot is ready on Render!');
});

client.on('message', async (msg) => {
    const pluginsDir = path.join(__dirname, 'plugins');
    const pluginFiles = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));

    for (const file of pluginFiles) {
        const plugin = require(path.join(pluginsDir, file));
        await plugin(msg, client);
    }
});

client.initialize();
