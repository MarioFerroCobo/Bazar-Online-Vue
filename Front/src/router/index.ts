// Importamos las funciones necesarias desde Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Importamos los componentes de las vistas que se utilizarán en las rutas
import Inicio from "@/views/Inicio.vue";
import BusquedaResultados from "@/views/BusquedaResultados.vue";
import DetalleProducto from "@/views/DetalleProducto.vue";
import CarritoCompras from "@/views/CarritoCompras.vue";

// Definimos las rutas de la aplicación en un array
const routes = [
  {
    path: "/", // Ruta raíz de la aplicación
    name: "Inicio", // Nombre de la ruta (opcional pero útil para navegación programática)
    component: Inicio, // Componente que se renderizará en esta ruta
  },
  {
    path: "/productos", // Ruta para la búsqueda de productos
    name: "BusquedaResultados",
    component: BusquedaResultados,
  },
  {
    path: "/productos/:id", // Ruta dinámica que captura el ID del producto en la URL
    name: "DetalleProducto",
    component: DetalleProducto,
    // Esta ruta permite acceder a los detalles de un producto específico,
    // donde ":id" es un parámetro dinámico que representa el identificador del producto.
  },
  {
    path: "/carrito", // Ruta para la vista del carrito de compras
    name: "CarritoCompras",
    component: CarritoCompras,
  },
];

// Creamos una instancia de Vue Router
const router = createRouter({
  history: createWebHistory(), // Usamos el modo de historial web (sin "#")
  routes, // Pasamos el array de rutas definidas
});

// Exportamos el router para que pueda ser utilizado en `main.ts`
export default router;
