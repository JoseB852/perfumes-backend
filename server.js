const express = require("express");
const cors = require("cors");

const productosRoutes = require("./routes/productos");

const app = express();

app.use(cors());
app.use("/api/productos", productosRoutes);

app.listen(3001, () => {
  console.log("🚀 Backend corriendo en http://localhost:3001");
});