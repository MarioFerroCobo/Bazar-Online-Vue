// 📌 Importamos 'defineStore' de Pinia para crear una store global
import { defineStore } from "pinia";
// 📌 Importamos 'ref' de Vue para manejar estados reactivos
import { ref } from "vue";
// 📌 Importamos las funciones de la API para obtener productos y detalles
import { fetchProducts, fetchProductById } from "@/services/api";
// 📌 Importamos el tipo 'Producto' para tipado estricto con TypeScript
import type { Producto } from "@/types/Product";

// 📌 Definimos la store de productos con Pinia
export const useProductosStore = defineStore("productos", () => {
  // 🔹 Estado reactivo que almacena la lista de productos
  const productos = ref<Producto[]>([]);
  // 🔹 Estado reactivo que almacena un solo producto cuando se accede a su detalle
  const producto = ref<Producto | null>(null);
  // 🔹 Estado reactivo que almacena los productos agregados al carrito
  const carrito = ref<Producto[]>([]);
  // 🔹 Estado reactivo para indicar si se está realizando una operación (cargando datos)
  const cargando = ref(false);

  /**
   * 🔍 Función para obtener productos basados en un término de búsqueda
   * @param {string} query - Texto de búsqueda ingresado por el usuario
   */
  const obtenerProductos = async (query: string) => {
    console.log("🟡 Iniciando búsqueda de productos con query:", query);

    if (!query.trim()) {
      productos.value = [];
      console.warn("🔴 La consulta de búsqueda está vacía. No se obtendrán productos.");
      return;
    }
    try {
      cargando.value = true;
      console.log("⌛ Haciendo solicitud a la API con query:", query);

      // 📡 Llamada a la API para obtener productos
      const resultados = await fetchProducts(query);
      
      console.log("✅ Productos recibidos en store (desde API):", resultados);

      // 📌 Validamos que la respuesta sea un array válido antes de actualizar el estado
      if (Array.isArray(resultados)) {
        productos.value = resultados;
      } else {
        console.error("🚨 Error: `fetchProducts` no devolvió un array válido.", resultados);
        productos.value = [];
      }

      console.log("📌 Estado actualizado de productos en store:", productos.value);
    } catch (error) {
      console.error("🚨 Error al obtener productos:", error);
      productos.value = [];
    } finally {
      cargando.value = false;
      console.log("🟢 Finalizada la obtención de productos.");
    }
  };

  /**
   * 🔍 Función para obtener los detalles de un producto por su ID
   * @param {string} id - Identificador único del producto
   */
  const obtenerProductoPorId = async (id: string) => {
    console.log(`🟡 Buscando producto con ID: ${id}`);

    try {
      cargando.value = true;
      // 📡 Llamada a la API para obtener los detalles del producto
      const resultado = await fetchProductById(id);
      console.log("✅ Producto recibido:", resultado);
      producto.value = resultado ?? null;
    } catch (error) {
      console.error("🚨 Error al obtener el producto:", error);
      producto.value = null;
    } finally {
      cargando.value = false;
    }
  };

  /**
   * 🛒 Función para agregar un producto al carrito si hay stock disponible
   * @param {Producto} producto - Objeto del producto seleccionado
   */
  const agregarAlCarrito = (producto: Producto) => {
    if (producto.stock > 0) {
      carrito.value.push(producto);
      console.log("✅ Producto agregado al carrito:", producto);
    } else {
      console.log("🚨 No se puede agregar, producto agotado.");
    }
  };

  /**
   * 🗑 Función para eliminar un producto del carrito por su ID
   * @param {number} id - Identificador único del producto a eliminar
   */
  const eliminarDelCarrito = (id: number) => {
    console.log(`🗑 Eliminando producto con ID: ${id} del carrito`);
    carrito.value = carrito.value.filter((p: Producto) => p.id !== id);
    console.log("📌 Estado actualizado del carrito:", carrito.value);
  };

  // 🔄 Retornamos todas las propiedades y funciones para que puedan ser usadas en los componentes
  return {
    productos,
    producto,
    carrito,
    cargando,
    obtenerProductos,
    obtenerProductoPorId,
    agregarAlCarrito,
    eliminarDelCarrito,
  };
});
