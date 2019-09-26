const express = require("express"); // just a function
const passport = require("passport");

const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

//passport middlewire
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/api/usersRoute");
const transaction = require("./routes/api/transactionsRoute");

app.use("/api/users", users);
app.use("/api/transaction", transaction);

// server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  const db = require("./config/Keys").mongoURI;
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch(err => {
      console.log(err);
    });
});
