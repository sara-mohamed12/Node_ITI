const mongoose = require("mongoose");
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected <3");
});
