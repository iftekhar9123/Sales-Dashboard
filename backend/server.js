const express = require("express");
const cors = require("cors");
const Routes = require("./routes/dashboardRoute.js");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", Routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});