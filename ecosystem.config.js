"use strict";

module.exports = {
  apps: [
    {
      name: "whatsapp-bot",
      script: "src/index.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
