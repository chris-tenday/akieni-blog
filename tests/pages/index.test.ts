import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import index from "/pages/index.vue"
import {mountSuspended, registerEndpoint} from "@nuxt/test-utils/runtime";
import store from "/store/index";


test("Index page can correctly render",async ()=>{
    const component=await mountSuspended(index,{
        global:{
            plugins:[store]
        }
    });

    expect(component.exists()).toBe(true);
},20000);
