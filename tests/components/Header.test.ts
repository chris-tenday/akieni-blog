import { mountSuspended} from '@nuxt/test-utils/runtime'
import Header from "/components/Header.vue"
import {expect,test} from "vitest";
import {mount} from "@vue/test-utils";
import store from "/store/index";

test("Header can render correctly",async ()=>{
    const component=await mount(Header,{
        global:{
            plugins:[store]
        }
    });

    expect(component.exists()).toBe(true);
});
