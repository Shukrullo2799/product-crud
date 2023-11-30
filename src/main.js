import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

import Menu from "primevue/menu";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Skeleton from "primevue/skeleton";
import Textarea from "primevue/textarea";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import OverlayPanel from "primevue/overlaypanel";

import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);

app.component("Menu", Menu);
app.component("Toast", Toast);
app.component("Button", Button);
app.component("Column", Column);
app.component("Dialog", Dialog);
app.component("Divider", Divider);
app.component("Dropdown", Dropdown);
app.component("Skeleton", Skeleton);
app.component("Textarea", Textarea);
app.component("DataTable", DataTable);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("OverlayPanel", OverlayPanel);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

app.mount("#app");
