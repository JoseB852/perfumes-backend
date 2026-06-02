const axios = require("axios");
const fs = require("fs");

const URL =
  "https://genesiscosmeticc.sumerlabs.com/catalogo/genesiscosmeticc";

async function actualizar() {
  try {
    console.log("🚀 Scraping iniciado...");

    const { data } = await axios.get(URL);

    const match = data.match(
      /window\.__remixContext\s*=\s*(\{.*?\});/s
    );

    if (!match) throw new Error("No remixContext encontrado");

    const ctx = JSON.parse(match[1]);

    const loaderKey = Object.keys(ctx.state.loaderData).find((k) =>
      k.includes("catalogo")
    );

    const loader = ctx.state.loaderData[loaderKey];

    const pages = loader.paginatedData.pages;

    let allProducts = [];

    // 🔥 AQUÍ SE JUNTAN TODAS LAS PÁGINAS
    pages.forEach((p) => {
      if (p.products) {
        allProducts.push(...p.products);
      }
    });

    const final = allProducts.map((p) => ({
      id: p.id,
      nombre: p.name,
      imagen: p.images?.[0] || "",
    }));

    fs.writeFileSync(
      "./data/productos.json",
      JSON.stringify(final, null, 2)
    );

    console.log(`✅ Productos guardados: ${final.length}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

actualizar();