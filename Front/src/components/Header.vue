<template>
  <!-- 📌 Sección de encabezado de la aplicación -->
  <header>
    <!-- 🔗 Barra de navegación con enlaces a las distintas vistas de la app -->
    <nav>
      <!-- 🌍 Enlace a la página de inicio -->
      <router-link to="/">Inicio</router-link>
      <!-- 🛍 Enlace a la página de productos -->
      <router-link to="/productos">Productos</router-link>
      <!-- 🛒 Enlace a la página del carrito de compras -->
      <router-link to="/carrito">Carrito</router-link>
    </nav>
  </header>
</template>

<script setup>
/**
 * Este archivo define el componente del encabezado (header) de la aplicación.
 * No se requiere lógica en el <script setup> ya que solo se manejan enlaces de navegación.
 */
</script>

<style scoped>
/* 🎨 Estilos del encabezado */
header {
  background: #f8f9fa; /* Color de fondo gris claro */
  padding: 1rem; /* Espaciado interno para que el contenido no quede pegado */
  text-align: center; /* Alinea el texto y los enlaces en el centro */
}

/* 🔗 Estilos de los enlaces de navegación */
nav a {
  margin: 0 1rem; /* Espaciado horizontal entre los enlaces */
  text-decoration: none; /* Quita el subrayado de los enlaces */
  color: #333; /* Color de texto oscuro */
}
</style>
