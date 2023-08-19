import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";

const app = createApp(App);
app.config.productionTip = false;

app.use(router); // Registriram Vue Router
app.use(Croppa); // Registriram vue-croppa
app.mount("#app");
