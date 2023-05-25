require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//Routes
const dallRoutes = require("./routes/dalle");
const postRoutes = require("./routes/post");
app.get("/", (req, res) => {
  res.send("Dall E Clone");
});

app.use("/api/v1/dalle", dallRoutes);
app.use("/api/v1/post", postRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => console.log("server is running at port 3000"));
  } catch (error) {
    console.log(error);
  }
};

start();
