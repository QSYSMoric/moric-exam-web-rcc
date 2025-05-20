/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '@pages' {
    import { RouteRecordRaw } from 'vue-router';
    const routes: RouteRecordRaw[];
    export default routes;
}
