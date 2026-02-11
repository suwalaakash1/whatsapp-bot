import { Client } from "whatsapp-web.js";
import type { Message } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import { config } from "../config";
import { handleOwnerCommand } from "./ownerCommands";
import { handleIncomingMessage } from "./messageHandler";
import { isBotEnabled } from "./state";

export function createClient(): Client {
  const client = new Client({});

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("qr", (qr: string) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("message_create", async (message: Message) => {
    console.log(message.fromMe, message.body, "dgfdgfdg");

    // handle self messages
    if (message.fromMe) {
      await handleOwnerCommand(message);
    }

    // pass, if bot is not enabled
    if (!isBotEnabled()) return;
    // pass, if group message
    if (message.from === "status@broadcast") return;
    if (config.ignoreGroups && message.from.endsWith("@g.us")) return;

    // handle incoming message
    // await handleIncomingMessage(message);
  });

  return client;
}
