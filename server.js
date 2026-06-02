const express = require("express");
const cors = require("cors");

const productosRoutes = require("./routes/productos");

const app = express();

// CORS (frontend puede conectar)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Rutas
app.use("/api/productos", productosRoutes);

// PORT dinámico para Render
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
});