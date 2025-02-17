<template>
  <div class="resultados">
    <h2>Resultados de búsqueda</h2>

    <!-- 📌 Mensaje de carga mientras se obtienen los productos -->
    <div v-if="cargando" class="cargando">Cargando...</div>

    <!-- 📌 Mensaje si no se encuentran productos -->
    <div v-else-if="productos.length === 0" class="no-resultados">No se encontraron productos.</div>

    <!-- 📌 Lista de productos cuando hay resultados -->
    <div v-else>
      <ul class="productos-lista">
        <li v-for="producto in productos" :key="producto.id" class="producto">
          <!-- 🔗 Enlace a la vista de detalles del producto -->
          <router-link :to="`/productos/${producto.id}`" class="producto-enlace">
            <!-- 🖼 Imagen del producto -->
            <img :src="producto.thumbnail" alt="Imagen del producto" class="producto-imagen" />
            <div class="producto-info">
              <!-- 🏷 Nombre del producto -->
              <h3 class="producto-titulo">{{ producto.title }}</h3>

              <!-- 📜 Descripción corta del producto (máximo 90 caracteres) -->
              <p class="producto-descripcion">
                {{ producto.description.length > 90 ? producto.description.slice(0, 90) + "..." : producto.description }}
              </p>

              <!-- 💲 Precio y ⭐ Calificación -->
              <div class="producto-detalles">
                <p class="producto-precio">{{ producto.price }}$</p>
                <div class="producto-rating">
                  <span v-for="star in Math.round(producto.rating)" :key="star">⭐</span>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductosStore } from "@/stores/productStore";

// 🔄 Obtenemos la ruta actual del usuario
const ruta = useRoute();

// 📦 Importamos la store de productos de Pinia
const tienda = useProductosStore();

// 🔍 Computed para obtener el término de búsqueda desde la URL
const terminoBusqueda = computed(() => ruta.query.search as string);

// 🔄 Computed para obtener la lista de productos desde la store
const productos = computed(() => {
  console.log("🟢 Productos en la vista:", tienda.productos);
  return tienda.productos;
});

// 🔄 Computed para indicar si la búsqueda está en curso
const cargando = computed(() => tienda.cargando);

// 👀 Detecta cambios en el término de búsqueda y actualiza los resultados
watch(terminoBusqueda, async (nuevoTermino) => {
  if (nuevoTermino) {
    console.log("🔵 Buscando productos para:", nuevoTermino);
    await tienda.obtenerProductos(nuevoTermino);
  }
});

// 🚀 Cuando el componente se monta, realiza una búsqueda inicial si hay un término en la URL
onMounted(async () => {
  if (terminoBusqueda.value) {
    console.log("⚡ Ejecutando búsqueda inicial:", terminoBusqueda.value);
    await tienda.obtenerProductos(terminoBusqueda.value);
  }
});
</script>

<style scoped>
/* 📌 Contenedor principal de la búsqueda */
.resultados {
  padding: 15px;
  font-family: "Poppins", sans-serif;
}

/* 🔄 Mensaje de carga y mensaje de "No se encontraron productos" */
.cargando,
.no-resultados {
  text-align: center;
  font-size: 1rem;
  color: #ff86a7;
  font-weight: bold;
  margin-top: 20px;
}

/* 📦 Lista de productos */
.productos-lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
  list-style: none;
}

/* 🛍 Tarjeta de cada producto */
.producto {
  background: white;
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.producto:hover {
  transform: scale(1.02);
}

/* 🔗 Estilos del enlace del producto */
.producto-enlace {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 100%;
}

/* 🖼 Estilos de la imagen del producto */
.producto-imagen {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
}

/* 🏷 Información del producto */
.producto-info {
  flex: 1;
}

/* 🏷 Nombre del producto */
.producto-titulo {
  font-weight: bold;
  font-size: 1rem;
}

/* 📜 Descripción corta */
.producto-descripcion {
  font-size: 0.85rem;
  color: gray;
}

/* 💲 Precio y ⭐ Calificación */
.producto-detalles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}

.producto-precio {
  font-weight: bold;
  font-size: 1.1rem;
  color: #ff86a7;
}

.producto-rating span {
  font-size: 1rem;
  color: gold;
}
</style>
