// Importamos 'createApp' de Vue para inicializar la aplicación Vue
import { createApp } from "vue";
// Importamos 'createPinia' para la gestión de estado global en Vue con Pinia
import { createPinia } from "pinia";
// Importamos el componente principal de la aplicación, 'App.vue'
import App from "@/App.vue";
// Importamos el enrutador definido en el archivo 'router/index.ts'
import router from "./router";

// Creamos una nueva instancia de la aplicación Vue y la asignamos a 'app'
const app = createApp(App);

// Agregamos Pinia a la aplicación para la gestión de estado global
app.use(createPinia());

// Agregamos Vue Router para manejar la navegación dentro de la aplicación
app.use(router);

// Montamos la aplicación en el elemento con id 'app' en el archivo 'index.html'
app.mount("#app");