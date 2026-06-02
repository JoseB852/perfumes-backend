const express = require("express");
const cors = require("cors");

const productosRoutes = require("./routes/productos");

const app = express();

// CORS (frontend puede conectar)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://perfumes-khaki.vercel.app"
  ]
}));

app.use(express.json());

// Rutas
app.use("/api/productos", productosRoutes);

// PORT dinámico para Render
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
});