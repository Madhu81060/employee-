const express = require("express");
const cors = require("cors");
require("dotenv").config(); // ✅ add this

const app = express();

app.use(cors());
app.use(express.json()); // ✅ bodyParser replace

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

// ✅ PORT change (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});