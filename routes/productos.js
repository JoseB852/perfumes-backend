const express = require("express");
const fs = require("fs");

const router = express.Router();

const getProductos = () => {
  try {
    return JSON.parse(fs.readFileSync("./data/productos.json", "utf-8"));
  } catch (e) {
    return [];
  }
};

router.get("/", (req, res) => {
  const productos = getProductos();

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 24;

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    success: true,
    total: productos.length,
    page,
    totalPages: Math.ceil(productos.length / limit),
    data: productos.slice(start, end),
  });
});

module.exports = router;