"use strict";

const { config } = require("../config");

async function generateAiReply({ messageText, history }) {
  if (!config.aiEnabled) return null;

  // Placeholder: integrate your AI provider here.
  // Return a string reply or null to fall back to rule-based replies.
  // You can use messageText and history for context.
  return null;
}

module.exports = { generateAiReply };
