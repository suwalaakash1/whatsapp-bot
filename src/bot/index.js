"use strict";

const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { config } = require("../config");
const { handleOwnerCommand } = require("./ownerCommands");
const { handleIncomingMessage } = require("./messageHandler");
const { isBotEnabled } = require("./state");

function createClient() {
  const client = new Client();

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("message", async (message) => {
    console.log(message.body);

    if (message.fromMe) {
      await handleOwnerCommand(message);
      return;
    }

    if (message.from === "status@broadcast") return;
    if (config.ignoreGroups && message.from.endsWith("@g.us")) return;
    if (!isBotEnabled()) return;

    await handleIncomingMessage(message);
  });

  return client;
}

module.exports = { createClient };
