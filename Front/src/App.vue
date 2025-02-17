<template>
  <div class="app">
    <!-- 🟣 Encabezado de la aplicación -->
    <header>
      <h1>Bazar Online</h1>
      <!-- 🔗 Barra de navegación con enlaces a las diferentes vistas -->
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/productos">Productos</router-link>
        <router-link to="/carrito">Carrito</router-link>
      </nav>
    </header>

    <!-- 📌 Sección principal donde se cargará la vista activa según la ruta -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
/**
 * Este archivo actúa como la estructura base de la aplicación.
 * No se requieren imports aquí, ya que solo define la estructura general.
 */
</script>

<style>
/* 🎨 Reinicio de estilos para una apariencia consistente en todos los navegadores */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif; /* Fuente moderna para mejor legibilidad */
  background-color: #f8f8f8; /* Fondo gris claro */
}

/* 🟣 Estilos para el encabezado */
header {
  background-color: #ff86a7; /* Color rosa característico */
  color: white; /* Texto en color blanco */
  padding: 15px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column; /* Organiza los elementos en columna */
  align-items: center;
  gap: 10px; /* Espacio entre elementos */
}

/* 🔗 Estilos para la barra de navegación */
nav {
  display: flex;
  gap: 15px; /* Espaciado entre enlaces */
}

nav a {
  color: white; /* Color del texto */
  text-decoration: none; /* Elimina el subrayado */
  font-weight: bold;
  transition: opacity 0.3s; /* Suaviza el efecto al pasar el cursor */
}

nav a:hover {
  opacity: 0.7; /* Reduce la opacidad al pasar el mouse */
}

/* 🟢 Centrar la vista principal */
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Ocupa al menos el 80% de la pantalla */
  padding: 20px;
}

/* 📌 Estilos para la barra de búsqueda */
.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* 🔍 Estilización del input de búsqueda */
input[type="text"] {
  width: 260px;
  padding: 10px;
  border: 2px solid #ff86a7;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
}

/* 🟠 Estilos del botón */
button {
  background-color: #ff86a7;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

button:hover {
  opacity: 0.8; /* Reduce la opacidad al pasar el mouse */
  transform: scale(1.05); /* Efecto de agrandamiento */
}
</style>

<!-- 2️⃣ Componentes (components/)
📌 ¿Qué es un componente?

    Es una pieza reutilizable de la interfaz de usuario.
    Se usa dentro de una vista o de otros componentes.
    Encapsula una funcionalidad específica como un botón, una tarjeta de producto, un header, etc..
    Se almacenan en la carpeta src/components/.

📌 Cuándo usar un componente

✅ Cuando un bloque de código se repite en varias vistas.
✅ Cuando una funcionalidad puede separarse para organizar mejor el código.
✅ Cuando queremos reutilizar una parte de la interfaz en varias páginas.
📌 Ejemplo de un componente (Header.vue)

<template>
  <header>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/carrito">Carrito</router-link>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
header {
  background: #ff86a7;
  padding: 15px;
  text-align: center;
}
nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}
</style>

➡️ Aquí Header.vue es un componente porque se usa en varias vistas como Inicio.vue y BusquedaResultados.vue. -->