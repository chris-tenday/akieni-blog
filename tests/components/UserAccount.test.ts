import {expect, test} from "vitest";
import UserAccount from "/components/UserAccount.vue"
import {mount} from "@vue/test-utils";
import store from "/store/index"


test("UserAccount can render",async()=>{

    const comp=await mount(UserAccount,{
        global:{
            plugins:[store]
        }
    });

    expect(comp.exists()).toBe(true);

});