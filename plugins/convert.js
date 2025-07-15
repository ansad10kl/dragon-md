// plugins/convert.js

module.exports = {
  name: 'convert',
  description: 'Convert media to mp3 or mp4 (audio/video)',
  execute: async ({ message, args }) => {
    const type = args[0]?.toLowerCase();

    if (!message.hasMedia) {
      return await message.reply('📎 Reply to a media message with:\n`!convert mp3` or `!convert mp4`');
    }

    if (!['mp3', 'mp4'].includes(type)) {
      return await message.reply('❓ Invalid format. Use `!convert mp3` or `!convert mp4`');
    }

    const media = await message.downloadMedia();
    if (!media) return await message.reply("❌ Couldn't download media.");

    const mime = type === 'mp3' ? 'audio/mp3' : 'video/mp4';

    await message.reply(media, undefined, {
      sendMediaAsDocument: true,
      mimetype: mime,
      filename: `converted.${type}`
    });
  }
};
