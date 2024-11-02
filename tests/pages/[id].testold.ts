import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import idPage from "/pages/posts/[id].vue"
import {mountSuspended} from "@nuxt/test-utils/runtime";
import {createWebHistory, useRouter} from "vue-router";
import {createRouter} from "vue-router";
import error404 from "/pages/404.vue"

test("Viewing a Single page is Ok",async ()=>{
    const router=createRouter({
        history:createWebHistory(),
        routes:[
            {
                path:"/posts/:id",
                component:idPage
            },
            {
                path:"/404",
                component:error404
            }
        ]
    });

    const component=await mountSuspended(idPage,{
        route:"/posts/1"
    });

    //await router.push('/posts/1');
    //await component.vm.$nextTick();
},50000);