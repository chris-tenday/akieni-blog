import {defineNuxtPlugin} from "#app";
import Api from "~/http/Api";

export default defineNuxtPlugin((nuxtApp)=>{
    const api=new Api(nuxtApp);
    nuxtApp.provide("api",api);
});