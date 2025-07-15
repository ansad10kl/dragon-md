// plugins/hello.js

module.exports = {
  name: 'hello',
  description: 'Replies with Hello!',
  execute: async ({ message }) => {
    await message.reply("Hello bro! 😎");
  }
};
