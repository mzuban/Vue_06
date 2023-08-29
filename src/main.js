import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import myUpload from "vue-image-crop-upload"; // Uvezi komponentu

const app = createApp(App);
app.config.productionTip = false;

app.use(router); // Registriraj Vue Router
app.component("my-upload", myUpload); // Registriraj komponentu
app.mount("#app");
