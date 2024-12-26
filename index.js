const session = require("express-session");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

require("dotenv/config");

// Conexão com o MongoDB usando variável de ambiente
mongoose.connect(process.env.MONGO_URI);

// Conexão com o MongoDB usando a URL direta
// mongoose.connect(
//   "mongodb+srv://mams3:D5R77BVcvRAnY3kv@cluster0.zidra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

app.use(
  session({
    secret: "ifpe",
    saveUninitialized: false,
    resave: false,
  })
);

const passageiroRoutes = require("./routes/passageiroRoutes");
app.use(passageiroRoutes);

const vooRoutes = require("./routes/vooRoutes");
app.use(vooRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

app.get("/", function (req, res) {
  if (req.session.email) {
    res.render("index");
  } else {
    res.redirect("/usuarios/login");
  }
});

app.get("/usuarios/cadastrar", (req, res) => {
  res.render("usuario/cadastrar");
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.listen(process.env.PORT, function () {
  console.log("Servidor iniciado");
});
