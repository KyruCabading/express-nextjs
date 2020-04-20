const express = require("express");
const next = require("next");
const flash = require("express-flash");
const exphbs = require("express-handlebars");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.engine("handlebars", exphbs({ defaultLayout: "main" }));
  server.set("view engine", "handlebars");

  server.use(flash());

  server.get("/a", (req, res) => {
    res.send("A");
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/home", function (req, res) {
    res.render("home");
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
