const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

require("./config/passport");


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("QueueLess Backend Running");
});


const authRoutes = require("./routes/auth.routes");
const queueRoutes = require("./routes/queue.routes");

app.use("/api/auth", authRoutes);
app.use("/api/queues", queueRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
