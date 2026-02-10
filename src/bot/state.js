"use strict";

const { config } = require("../config");

let botEnabled = config.botEnabled;

function isBotEnabled() {
  return botEnabled;
}

function setBotEnabled(value) {
  botEnabled = Boolean(value);
}

module.exports = { isBotEnabled, setBotEnabled };
