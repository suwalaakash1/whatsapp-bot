"use strict";

const { sleep, randomBetween } = require("../utils/time");

async function replyWithTyping(message, replyText) {
  const chat = await message.getChat();
  await chat.sendStateTyping();
  await sleep(randomBetween(600, 1400));
  await message.reply(replyText);
  await chat.clearState();
}

module.exports = { replyWithTyping };
