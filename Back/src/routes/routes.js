import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el JSON y asegurarse de que products es un array
const rawData = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
const parsedData = JSON.parse(rawData);
const products = Array.isArray(parsedData) ? parsedData : parsedData.products; // ✅ Asegurar que es un array

const router = express.Router();

router.get("/items", (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ error: "Se requiere un término de búsqueda" });
  }

  // Función para verificar si algún campo del producto contiene la búsqueda
  const contieneBusqueda = (producto, query) => {
    return Object.values(producto).some(value =>
      typeof value === "string" && value.toLowerCase().includes(query)
    );
  };

  // Filtrar productos que coincidan en cualquier campo
  const resultados = products.filter(producto => contieneBusqueda(producto, query));

  if (resultados.length === 0) {
    return res.status(404).json({ error: "No se encontraron productos" });
  }

  res.json(resultados);
});

// 🔹 Ruta para obtener un producto por ID
router.get("/items/:id", (req, res) => {
  const { id } = req.params;
  console.log("📌 Buscando producto con ID:", id);

  const producto = products.find((p) => p.id === parseInt(id)); // Buscar por ID

  if (!producto) {
    console.error("🚨 Producto no encontrado con ID:", id);
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  console.log("✅ Producto encontrado:", producto);
  res.json(producto);
});

export default router;
