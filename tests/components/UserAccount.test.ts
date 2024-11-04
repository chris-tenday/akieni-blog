import {expect, it} from "vitest";
import UserAccount from "/components/UserAccount.vue"
import {mount} from "@vue/test-utils";
import store from "/store/index"


it("renders correctly",async()=>{

    const comp=await mount(UserAccount,{
        global:{
            plugins:[store]
        }
    });

    /**
     * Assert if the component is successfully mounted.
     */
    expect(comp.exists()).toBe(true);

});