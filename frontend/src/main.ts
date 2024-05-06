/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import 'devextreme/dist/css/dx.fluent.blue.light.css';
// Plugins
import { registerPlugins } from './plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import router from './router';

const app = createApp(App);

registerPlugins(app);
app.use(router);
app.mount('#app');
