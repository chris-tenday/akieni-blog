import { defineNuxtPlugin } from '#app';
import store from "~/store";


export default defineNuxtPlugin((nuxtApp)=>{
    // noinspection TypeScriptValidateTypes
    nuxtApp.vueApp.use(store);
});