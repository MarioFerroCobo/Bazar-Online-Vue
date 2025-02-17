// 📌 Importamos Axios, una biblioteca para realizar solicitudes HTTP en JavaScript
import axios from "axios";

// 🔗 Configuramos la URL base del backend
// Aquí se define la dirección de la API desde donde obtendremos los datos
const API_URL = "http://localhost:3000/api/items";

/**
 * 🔍 Función para obtener productos desde la API basada en un término de búsqueda
 * 
 * @param {string} query - Término de búsqueda ingresado por el usuario
 * @returns {Promise<Array>} - Retorna una lista de productos que coinciden con la búsqueda
 */
export const fetchProducts = async (query: string) => {
  try {
    // 📡 Realizamos una solicitud GET a la API agregando el término de búsqueda en la URL
    const response = await axios.get(`${API_URL}?q=${query}`);

    // 📤 Mostramos en la consola la respuesta completa de la API (útil para depuración)
    console.log("📥 Respuesta completa de la API:", response);
    console.log("✅ Datos devueltos por la API:", response.data);

    // 🔄 Retornamos los datos obtenidos de la API (en este caso, un array de productos)
    return response.data; 
  } catch (error) {
    // ⚠️ Si ocurre un error en la petición, lo mostramos en la consola
    console.error("Error al obtener los productos:", error);

    // 🔄 Retornamos un array vacío en caso de error para evitar que la aplicación falle
    return [];
  }
};

/**
 * 📦 Función para obtener los detalles de un producto por su ID
 * 
 * @param {string} id - ID del producto a consultar
 * @returns {Promise<Object | null>} - Retorna los detalles del producto o `null` si hay un error
 */
export const fetchProductById = async (id: string) => {
  try {
    // 📡 Realizamos una solicitud GET a la API con el ID del producto
    const response = await axios.get(`${API_URL}/${id}`);

    // 🔄 Retornamos los datos del producto obtenido desde la API
    return response.data;
  } catch (error) {
    // ⚠️ Si ocurre un error en la solicitud, lo mostramos en la consola
    console.error("Error al obtener el producto:", error);

    // 🔄 Retornamos `null` en caso de error para evitar fallos en la interfaz
    return null;
  }
};

/* 
Si se requiere token
const API_URL = "https://api.ejemplo.com/items";

export const fetchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}?q=${query}`, {
      headers: {
        Authorization: "Bearer TU_TOKEN_AQUI", // Token de autenticación
        "Content-Type": "application/json", // Tipo de contenido
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}; */

/* 📌 2️⃣ POST - Enviar datos a una API

El método POST se usa para enviar datos y crear nuevos registros.
Ejemplo: Agregar un producto a la API.

<template>
  <div>
    <h2>Agregar Producto</h2>
    <input v-model="nuevoProducto.title" placeholder="Nombre del producto" />
    <input v-model="nuevoProducto.price" type="number" placeholder="Precio" />
    <button @click="agregarProducto">Agregar</button>

    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// 📦 Datos del nuevo producto
const nuevoProducto = ref({ title: "", price: 0 });
const mensaje = ref("");

const agregarProducto = async () => {
  try {
    const response = await axios.post("https://fakestoreapi.com/products", nuevoProducto.value);
    mensaje.value = "Producto agregado con éxito!";
    console.log("Producto creado:", response.data);
  } catch (error) {
    console.error("Error al agregar producto:", error);
    mensaje.value = "Error al agregar producto.";
  }
};
</script>

✅ Explicación:

    axios.post("URL", datos) envía los datos a la API.
    v-model vincula los inputs con nuevoProducto */

/*     📌 3️⃣ PUT - Actualizar datos en una API

El método PUT se usa para actualizar un registro existente.
Ejemplo: Actualizar un producto por su id.

<template>
  <div>
    <h2>Actualizar Producto</h2>
    <input v-model="productoActualizado.title" placeholder="Nuevo Nombre" />
    <input v-model="productoActualizado.price" type="number" placeholder="Nuevo Precio" />
    <button @click="actualizarProducto">Actualizar</button>

    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const productoActualizado = ref({ id: 1, title: "", price: 0 });
const mensaje = ref("");

const actualizarProducto = async () => {
  try {
    const response = await axios.put(`https://fakestoreapi.com/products/${productoActualizado.value.id}`, productoActualizado.value);
    mensaje.value = "Producto actualizado con éxito!";
    console.log("Producto actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    mensaje.value = "Error al actualizar producto.";
  }
};
</script>

✅ Explicación:

    axios.put("URL/id", datos) envía los nuevos datos del producto.
    Se usa ${productoActualizado.value.id} para referenciar el ID del producto a actualizar.
 */

/*     📌 4️⃣ DELETE - Eliminar un registro en una API

El método DELETE se usa para eliminar un registro por su id.
Ejemplo: Eliminar un producto.

<template>
  <div>
    <h2>Eliminar Producto</h2>
    <input v-model="idProducto" type="number" placeholder="ID del producto" />
    <button @click="eliminarProducto">Eliminar</button>

    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const idProducto = ref("");
const mensaje = ref("");

const eliminarProducto = async () => {
  try {
    await axios.delete(`https://fakestoreapi.com/products/${idProducto.value}`);
    mensaje.value = "Producto eliminado con éxito!";
    console.log(`Producto con ID ${idProducto.value} eliminado.`);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    mensaje.value = "Error al eliminar producto.";
  }
};
</script>

✅ Explicación:

    axios.delete("URL/id") elimina el producto de la API.
    Se pasa el id del producto desde un input. */