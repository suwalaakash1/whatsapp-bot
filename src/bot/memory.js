"use strict";

const { config } = require("../config");

const sessions = new Map();

function getSession(chatId) {
  if (!sessions.has(chatId)) {
    sessions.set(chatId, {
      awaiting: null,
      lastIntent: null,
      messages: [],
      metadata: {},
    });
  }
  return sessions.get(chatId);
}

function addMessage(chatId, role, text) {
  const session = getSession(chatId);
  session.messages.push({ role, text, ts: Date.now() });

  const maxMessages = Number(config.memoryMaxMessages || 20);
  if (session.messages.length > maxMessages) {
    session.messages.splice(0, session.messages.length - maxMessages);
  }
}

function getHistory(chatId) {
  const session = getSession(chatId);
  return session.messages.slice();
}

function clearSession(chatId) {
  sessions.delete(chatId);
}

module.exports = {
  getSession,
  addMessage,
  getHistory,
  clearSession,
};
