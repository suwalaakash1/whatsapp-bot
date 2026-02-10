"use strict";

const { config } = require("../config");
const { pick } = require("../utils/text");

const INTENTS = [
  {
    name: "ping",
    patterns: [/\bping\b/i],
    reply: () => "pong",
  },
  {
    name: "greeting",
    patterns: [
      /\bhi\b/i,
      /\bhello\b/i,
      /\bhey\b/i,
      /\bnamaste\b/i,
      /\bgood\s*(morning|afternoon|evening)\b/i,
    ],
    reply: () =>
      pick([
        `Hi! Thanks for reaching out to ${config.businessName}. How can I help?`,
        `Hello! This is ${config.businessName}. What can I assist you with today?`,
        `Hey there! I'm here to help while ${config.ownerName} is away.`,
      ]),
  },
  {
    name: "hours",
    patterns: [
      /\bhours?\b/i,
      /\bopen\b/i,
      /\bopening\b/i,
      /\bclosing\b/i,
      /\btimings?\b/i,
    ],
    reply: () =>
      config.businessHours
        ? `Our hours are ${config.businessHours}.`
        : "What time were you hoping to reach us?",
  },
  {
    name: "price",
    patterns: [
      /\bprice\b/i,
      /\bcost\b/i,
      /\brate\b/i,
      /\bpricing\b/i,
      /\bquote\b/i,
      /\bhow\s*much\b/i,
    ],
    reply: () =>
      "Happy to help with pricing. Which product or service are you interested in?",
    setAwaiting: "product",
  },
  {
    name: "location",
    patterns: [
      /\bwhere\b/i,
      /\baddress\b/i,
      /\blocation\b/i,
      /\bmap\b/i,
    ],
    reply: () =>
      config.businessAddress
        ? `We are located at ${config.businessAddress}.`
        : "Which area are you looking for?",
  },
  {
    name: "order_status",
    patterns: [
      /\border\b/i,
      /\btracking\b/i,
      /\btrack\b/i,
      /\bstatus\b/i,
      /\bshipment\b/i,
    ],
    reply: () => "Sure. Please share your order ID.",
    setAwaiting: "order_id",
  },
  {
    name: "human",
    patterns: [
      /\bhuman\b/i,
      /\bagent\b/i,
      /\bowner\b/i,
      /\bcall\b/i,
      /\bspeak\b/i,
      /\bcallback\b/i,
    ],
    reply: () =>
      `I can ask ${config.ownerName} to follow up. Please share your phone number and a good time.`,
    setAwaiting: "handoff_contact",
  },
  {
    name: "thanks",
    patterns: [/\bthanks\b/i, /\bthank you\b/i, /\bthx\b/i],
    reply: () => "You're welcome! If you need anything else, just let me know.",
  },
  {
    name: "website",
    patterns: [/\bwebsite\b/i, /\bsite\b/i, /\blink\b/i],
    reply: () =>
      config.businessWebsite
        ? `Here is our website: ${config.businessWebsite}`
        : "What information are you looking for?",
  },
  {
    name: "phone",
    patterns: [/\bphone\b/i, /\bnumber\b/i, /\bcontact\b/i],
    reply: () =>
      config.businessPhone
        ? `You can reach us at ${config.businessPhone}.`
        : "What is the best way to contact you?",
  },
];

function findIntent(text) {
  for (const intent of INTENTS) {
    if (intent.patterns.some((pattern) => pattern.test(text))) {
      return intent;
    }
  }
  return null;
}

module.exports = { findIntent };
