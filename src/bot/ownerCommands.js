"use strict";

const { isBotEnabled, setBotEnabled } = require("./state");
const { normalize } = require("../utils/text");

async function handleOwnerCommand(message) {
  const text = normalize(message.body);
  if (text === "!bot on") {
    setBotEnabled(true);
    await message.reply("Bot enabled.");
    return true;
  }
  if (text === "!bot off") {
    setBotEnabled(false);
    await message.reply("Bot disabled.");
    return true;
  }
  if (text === "!bot status") {
    await message.reply(`Bot is currently ${isBotEnabled() ? "ON" : "OFF"}.`);
    return true;
  }
  return false;
}

module.exports = { handleOwnerCommand };
