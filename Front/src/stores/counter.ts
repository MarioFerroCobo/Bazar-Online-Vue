import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

/* 📌 ¿Es necesario usar Vue Router si estoy trabajando con APIs?

No es estrictamente necesario, pero sí altamente recomendable si tu aplicación tiene múltiples páginas o vistas dinámicas.
1️⃣ ¿Cuándo NO necesitas Vue Router?

Si tu aplicación solo tiene una única vista o toda la información se muestra en un solo componente, entonces puedes consumir la API sin usar Vue Router.

✅ Ejemplo sin Vue Router (una sola página que consume una API):

<template>
  <div>
    <h1>Lista de Productos</h1>
    <ul>
      <li v-for="producto in productos" :key="producto.id">
        {{ producto.title }} - ${{ producto.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// 📦 Lista de productos obtenida desde la API
const productos = ref([]);

onMounted(async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  productos.value = response.data;
});
</script>

➡️ Aquí NO usamos router-view ni Vue Router porque toda la información se muestra en una sola vista.
2️⃣ ¿Cuándo SÍ necesitas Vue Router?

Si tu aplicación tiene diferentes vistas dinámicas, como:

    Página de búsqueda de productos
    Página de detalles de un producto
    Carrito de compras

✅ Ejemplo con Vue Router (Múltiples vistas con rutas dinámicas)

<template>
  <div>
    <h1>Bazar Online</h1>
    <router-view />  📌 Aquí se cargarán las vistas dinámicas según la URL 
  </div>
</template>

➡️ Con Vue Router, puedes:

    Navegar entre vistas sin recargar la página.
    Pasar parámetros en la URL (Ejemplo: /productos/5 para ver el producto con ID 5).
    Hacer peticiones a la API según la URL.

Ejemplo de vista dinámica que obtiene datos desde una API según la URL

<template>
  <div v-if="producto">
    <h2>{{ producto.title }}</h2>
    <p>{{ producto.description }}</p>
    <p>Precio: ${{ producto.price }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute(); // 📌 Obtiene el ID del producto desde la URL
const producto = ref(null);

onMounted(async () => {
  const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`);
  producto.value = response.data;
});
</script>

➡️ Aquí useRoute() obtiene el id del producto desde la URL y lo usa para hacer una petición a la API. */