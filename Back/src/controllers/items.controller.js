import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta correcta del archivo en Windows y Linux
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/products.json");

// Cargar datos del JSON
const rawData = fs.readFileSync(filePath);
const { products } = JSON.parse(rawData);

// Endpoint: Buscar productos por query en título, descripción o categoría
export const getItems = (req, res) => {
    const query = req.query.q?.toLowerCase() || "";

    if (!query) {
        return res.status(400).json({ error: "Debes proporcionar un parámetro de búsqueda." });
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    res.json({ results: filteredProducts });
};

// Endpoint: Obtener un producto por ID
export const getItemById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json(product);
};
