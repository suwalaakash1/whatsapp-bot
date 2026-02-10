"use strict";

const { config } = require("../config");
const { findIntent } = require("./intents");
const { replyWithTyping } = require("./reply");
const { addMessage, getSession, getHistory } = require("./memory");
const { normalize, pick, extractOrderId, extractPhone } = require("../utils/text");
const { generateAiReply } = require("./ai");

async function handleIncomingMessage(message) {
  const text = message.body || "";
  const normalized = normalize(text);
  const session = getSession(message.from);

  addMessage(message.from, "user", text);

  if (session.awaiting === "order_id") {
    const orderId = extractOrderId(text);
    if (!orderId) {
      await replyAndStore(message, "Please share your order ID.");
      return;
    }
    session.awaiting = null;
    await replyAndStore(
      message,
      `Thanks! I have the order ID ${orderId}. We'll check and update you soon.`
    );
    return;
  }

  if (session.awaiting === "handoff_contact") {
    const phone = extractPhone(text);
    if (!phone) {
      await replyAndStore(
        message,
        "Please share a phone number so the owner can follow up."
      );
      return;
    }
    session.awaiting = null;
    await replyAndStore(
      message,
      `Got it. ${config.ownerName} will contact you soon at ${phone}.`
    );
    return;
  }

  if (session.awaiting === "product") {
    session.awaiting = "details";
    await replyAndStore(
      message,
      "Thanks! Could you share quantity, budget, and your timeline?"
    );
    return;
  }

  if (session.awaiting === "details") {
    session.awaiting = null;
    await replyAndStore(
      message,
      `Great, I have noted this and will share it with ${config.ownerName}.`
    );
    return;
  }

  const intent = findIntent(normalized);
  if (intent) {
    session.lastIntent = intent.name;
    if (intent.setAwaiting) session.awaiting = intent.setAwaiting;
    await replyAndStore(message, intent.reply());
    return;
  }

  const aiReply = await generateAiReply({
    messageText: text,
    history: getHistory(message.from),
  });
  if (aiReply) {
    await replyAndStore(message, aiReply);
    return;
  }

  await replyAndStore(
    message,
    pick([
      "Thanks for reaching out! Could you share a bit more so I can help?",
      "I want to help with this. Can you give me a few more details?",
      `I can assist while ${config.ownerName} is away. What exactly do you need?`,
    ])
  );
}

async function replyAndStore(message, replyText) {
  await replyWithTyping(message, replyText);
  addMessage(message.from, "assistant", replyText);
}

module.exports = { handleIncomingMessage };
