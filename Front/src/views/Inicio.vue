<template>
  <div class="home">
    <!-- 🏪 Título principal de la página de inicio -->
    <h1>Bazar Online</h1>

    <!-- 🔍 Input de búsqueda: el usuario escribe aquí el nombre del producto -->
    <input v-model="searchQuery" placeholder="Buscar productos..." />

    <!-- 🔎 Botón de búsqueda: cuando el usuario hace clic, se ejecuta searchProducts() -->
    <button @click="searchProducts">Buscar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"; // 📌 Importamos 'ref' para crear variables reactivas
import { useRouter } from "vue-router"; // 📌 Importamos 'useRouter' para la navegación programática

// 🔎 'searchQuery' almacena el texto ingresado en el campo de búsqueda
const searchQuery = ref("");

// 📌 Obtenemos el router de Vue para poder cambiar de página sin recargar
const router = useRouter();

/**
 * 🔍 Función para realizar la búsqueda de productos
 * - Verifica si el usuario ha escrito algo.
 * - Si hay texto, redirige a la página de resultados con la búsqueda en la URL.
 */
const searchProducts = () => {
  if (searchQuery.value.trim()) {
    // 📌 Redirige a "/productos?search=..." con el término de búsqueda en la URL
    router.push(`/productos?search=${searchQuery.value}`);
  }
};
</script>

<!-- 📌 Diferencia entre Vistas (views/) y Componentes (components/) en Vue

En Vue.js, la estructura de una aplicación normalmente se divide en vistas y componentes, pero cada una tiene un propósito diferente.
1️⃣ Vistas (views/)
📌 ¿Qué es una vista?

    Son páginas completas dentro de la aplicación.
    Están asociadas a rutas en Vue Router (/inicio, /productos, /carrito).
    Representan secciones principales de la aplicación.
    Se almacenan en la carpeta src/views/.

📌 Cuándo usar una vista

✅ Cuando el archivo representa una página entera.
✅ Cuando el archivo debe ser accesible a través de una ruta (router-view).
✅ Cuando se muestra un conjunto de componentes dentro de una misma pantalla.
📌 Ejemplo de una vista (Inicio.vue)

<template>
  <div class="home">
    <h1>Bienvenido a Bazar Online</h1>
    <input v-model="searchQuery" placeholder="Buscar productos..." />
    <button @click="searchProducts">Buscar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const router = useRouter();

const searchProducts = () => {
  if (searchQuery.value.trim()) {
    router.push(`/productos?search=${searchQuery.value}`);
  }
};
</script>

➡️ Aquí Inicio.vue es una vista porque representa una página completa (/inicio). -->