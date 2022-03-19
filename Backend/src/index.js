//Apps en uso
const express = require("express");
const cors = require("cors");
const app = express();

//base de datos
require("./database");

// configuración
app.set("port", process.env.PORT || 8080);

// middlewares
app.use(express.json());
app.use(cors());

// rutas
app.use("/api", require("./routes/index"));

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
