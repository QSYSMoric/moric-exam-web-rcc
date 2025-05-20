import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import { store } from './store';
import router from './router';
import { updateTheme } from './utils/theme';

import 'virtual:uno.css';
import '@/assets/styles/index.scss';
import 'element-plus/theme-chalk/src/message.scss';

async function main() {
    const app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(ElementPlus);

    app.mount('#app');

    updateTheme();
}

main();
