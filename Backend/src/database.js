const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/seguridadInformatica", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`Database ⚡`))
  .catch((err) => console.log(err));
