// server.js
const { createServer } = require("http");
const express = require("express");
const next = require("next");

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const nextHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.get("/a", (req, res) => {
    res.send("Hello");
  });

  app.get("*", (req, res) => {
    nextHandle(req, res);
  });

  const server = createServer(app);
  server.listen(3000, () => {});
});
