<template>
  <div class="carrito-compras">
    <!-- 🛒 Título de la página del carrito -->
    <h2>Carrito de Compras 🛒</h2>

    <!-- 📌 Mensaje si el carrito está vacío -->
    <div v-if="carrito.length === 0">No hay productos en el carrito.</div>

    <!-- 📦 Lista de productos en el carrito -->
    <ul v-else>
      <li v-for="producto in carrito" :key="producto.id">
        <!-- 🖼 Imagen del producto -->
        <img :src="producto.thumbnail" alt="Imagen del producto" />

        <!-- 📌 Información del producto -->
        <h3>{{ producto.title }}</h3>
        <p><strong>Precio:</strong> ${{ producto.price }}</p>

        <!-- 🗑 Botón para eliminar el producto del carrito -->
        <button @click="eliminarDelCarrito(producto.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductosStore } from "@/stores/productStore";

// 📦 Accedemos a la store de productos en Pinia
const tienda = useProductosStore();

// 🔄 Computed para obtener la lista de productos en el carrito desde la store
const carrito = computed(() => tienda.carrito);

/**
 * 🗑 Función para eliminar un producto del carrito
 * @param {number} id - ID del producto que se quiere eliminar
 */
const eliminarDelCarrito = (id: number) => {
  tienda.eliminarDelCarrito(id);
};
</script>
  
<!-- 3️⃣ ¿Cómo interactúan Vistas y Componentes?

Las vistas contienen componentes dentro de ellas.
Ejemplo de App.vue, que carga una vista con un componente:

<template>
  <div>
    <Header />  ✅ Componente 
    <router-view />  ✅ Carga la vista activa según la URL 
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue"; // 📌 Importamos el componente
</script> -->