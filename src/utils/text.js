"use strict";

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function extractOrderId(text) {
  const match = String(text || "").match(/[a-z0-9-]{5,}/i);
  return match ? match[0] : null;
}

function extractPhone(text) {
  const match = String(text || "").match(/(\+?\d[\d\s-]{7,}\d)/);
  return match ? match[1].replace(/\s+/g, "") : null;
}

module.exports = {
  normalize,
  pick,
  extractOrderId,
  extractPhone,
};
