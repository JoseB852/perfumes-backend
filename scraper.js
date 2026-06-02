const fs = require("fs");

(async () => {
  const puppeteer = await import("puppeteer");

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const productosMap = new Map();

  console.log("🚀 Iniciando scraping...");

  // Puedes aumentar este número si descubres más páginas
  const TOTAL_PAGINAS = 15;

  for (let pagina = 1; pagina <= TOTAL_PAGINAS; pagina++) {
    const url =
      pagina === 1
        ? "https://genesiscosmeticc.sumerlabs.com/todos-los-productos"
        : `https://genesiscosmeticc.sumerlabs.com/todos-los-productos?page=${pagina}`;

    console.log(`📄 Página ${pagina}: ${url}`);

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await new Promise((r) => setTimeout(r, 3000));

    const productosPagina = await page.evaluate(() => {
      return [...document.querySelectorAll("img")]
        .map((img) => ({
          nombre: img.alt?.trim(),
          imagen: img.src,
        }))
        .filter(
          (p) =>
            p.nombre &&
            p.nombre.length > 3 &&
            p.nombre !== "Genesiscosmeticc"
        );
    });

    console.log(
      `✅ Productos encontrados en página ${pagina}:`,
      productosPagina.length
    );

    productosPagina.forEach((producto) => {
      if (!productosMap.has(producto.nombre)) {
        productosMap.set(producto.nombre, producto);
      }
    });
  }

  const productos = [...productosMap.values()].map((p, index) => ({
    id: index + 1,
    nombre: p.nombre,
    imagen: p.imagen,
  }));

  fs.writeFileSync(
    "./data/productos.json",
    JSON.stringify(productos, null, 2)
  );

  console.log("=================================");
  console.log("🎉 TOTAL PRODUCTOS ÚNICOS:", productos.length);
  console.log("=================================");

  await browser.close();
})();