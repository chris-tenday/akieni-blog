import {expect, test} from "vitest";
import {mountSuspended} from "@nuxt/test-utils/runtime";
import UserAccount from "/components/UserAccount.vue"


test("UserAccount can render",async()=>{

    const comp=await mountSuspended(UserAccount);

    expect(comp.text()).toMatch(/Login to Akieni/i);

});