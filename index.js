const session = require("express-session");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
require("dotenv/config");
mongoose.connect(process.env.MONGO_URI);

mongoose.connect(
  "mongodb+srv://mams3:D5R77BVcvRAnY3kv@cluster0.zidra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const passageiroRoutes = require("./routes/passageiroRoutes");
app.use(passageiroRoutes);

const vooRoutes = require("./routes/vooRoutes");
app.use(vooRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

/*app.use("/", function (req, res) {
  if (req.session.email) {
    res.render("index");
  } else {
    res.redirect("/usuarios/login");
  }
});*/

app.get("/", function (req, res) {
  res.render("index");
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(
  session({
    secret: "ifpe",
    saveUninitialized: true,
    resave: false,
  })
);

app.listen(process.env.PORT, function () {
  console.log("Servidor iniciado");
});