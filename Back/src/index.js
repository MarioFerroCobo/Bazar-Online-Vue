import express from "express";
import cors from "cors";
import router from "./routes/routes.js"; // Asegúrate de que la ruta es correcta

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", router); // La API debe estar bien montada

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
