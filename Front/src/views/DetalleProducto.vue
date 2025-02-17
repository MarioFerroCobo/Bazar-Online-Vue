<template>
  <div class="detalle-producto">
    <!-- 🖼 Imagen principal del producto -->
    <img :src="imagenPrincipal" alt="Imagen del producto" class="imagen-principal" />

    <!-- 📸 Miniaturas de imágenes adicionales del producto -->
    <div class="imagenes-secundarias">
      <img 
        v-for="(img, index) in producto?.images" 
        :key="index" 
        :src="img" 
        alt="Imagen del producto"
        @click="cambiarImagenPrincipal(img)" 
        class="miniatura"
      />
    </div>

    <!-- 📌 Información del producto -->
    <h2>{{ producto?.title }} - {{ producto?.brand }}</h2>
    <p class="precio">${{ producto?.price }}</p>

    <!-- 📦 Disponibilidad del producto -->
    <p class="disponibilidad" :class="{ agotado: producto?.stock === 0 }">
      <strong>{{ producto?.stock ? `${producto.stock} disponibles` : "Agotado" }}</strong>
    </p>

    <!-- ⭐ Calificación del producto -->
    <p class="rating">⭐ {{ producto?.rating }}</p>

    <!-- 📖 Descripción del producto -->
    <p class="descripcion">{{ producto?.description }}</p>

    <!-- 🛒 Botón de compra (deshabilitado si no hay stock) -->
    <button 
      class="btn-comprar"
      :disabled="producto?.stock === 0"
      @click="comprarProducto"
    >
      Comprar
    </button>
  </div>
</template>

<script setup lang="ts">
/* computed	Crea propiedades calculadas, que se actualizan automáticamente si su valor base cambia. Se usa aquí para obtener el ID del producto desde la URL y acceder al producto en la store.
onMounted	Ejecuta código cuando el componente se ha montado en el DOM. Aquí se usa para cargar los datos del producto cuando la vista se renderiza.
ref	Permite crear variables reactivas. Se usa para almacenar la imagen principal del producto y poder cambiarla dinámicamente. */
import { computed, onMounted, ref } from "vue";
/* Esta línea importa useRoute de Vue Router, el sistema de enrutamiento de Vue.
        Para acceder a los parámetros de la URL, en este caso, el id del producto.
        Permite saber qué producto se debe mostrar según la URL actual. */
import { useRoute } from "vue-router";
/* Esta línea importa la store de productos creada con Pinia.
        Para acceder a los datos del producto desde la gestión de estado global.
        Permite llamar a funciones como obtenerProductoPorId(id) para recuperar información del producto. */
import { useProductosStore } from "@/stores/productStore";

// 📌 Obtenemos la ruta actual para capturar el ID del producto
const ruta = useRoute();

// 📦 Accedemos a la store de productos en Pinia
const tienda = useProductosStore();

// 🔍 Computed para obtener el ID del producto desde la URL
const idProducto = computed(() => ruta.params.id as string);

// 📦 Computed para obtener la información del producto desde la store
const producto = computed(() => tienda.producto);

// 🖼 Estado reactivo para la imagen principal del producto
const imagenPrincipal = ref(producto.value?.thumbnail || "");

// 🚀 Carga los datos del producto cuando el componente se monta
onMounted(async () => {
  if (idProducto.value) {
    await tienda.obtenerProductoPorId(idProducto.value);
    imagenPrincipal.value = producto.value?.thumbnail || "";
  }
});

/**
 * 🔄 Función para cambiar la imagen principal al hacer clic en una miniatura
 * @param {string} imagen - URL de la nueva imagen principal
 */
const cambiarImagenPrincipal = (imagen: string) => {
  imagenPrincipal.value = imagen;
};

/**
 * 🛒 Función para agregar el producto al carrito si hay stock disponible
 */
const comprarProducto = () => {
  if (producto.value && producto.value.stock > 0) {
    tienda.agregarAlCarrito(producto.value);
    alert("Producto agregado al carrito");
  } else {
    alert("Este producto está agotado.");
  }
};
</script>

<style scoped>
/* 📌 Estilos generales del contenedor */
.detalle-producto {
  text-align: center;
}

/* 🖼 Imagen principal del producto */
.imagen-principal {
  width: 200px;
  height: auto;
  border-radius: 10px;
}

/* 📸 Contenedor de miniaturas */
.imagenes-secundarias {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

/* 📸 Miniaturas de imágenes adicionales */
.miniatura {
  width: 50px;
  height: auto;
  cursor: pointer;
  border-radius: 5px;
}

/* 💲 Precio del producto */
.precio {
  font-size: 1.5em;
  font-weight: bold;
  color: #ff4081;
}

/* 📦 Disponibilidad del producto */
.disponibilidad {
  font-size: 1.2em;
  font-weight: bold;
  color: green;
}

/* 🛑 Estilos si el producto está agotado */
.disponibilidad.agotado {
  color: red;
}

/* ⭐ Estilo del rating */
.rating {
  font-size: 1.2em;
  margin: 5px 0;
}

/* 📖 Descripción del producto */
.descripcion {
  font-size: 1em;
  color: #333;
  margin: 10px;
}

/* 🛒 Botón de compra */
.btn-comprar {
  background-color: #ff4081;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  cursor: pointer;
  margin-top: 10px;
}

/* 🚫 Estilo del botón cuando el producto está agotado */
.btn-comprar:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
