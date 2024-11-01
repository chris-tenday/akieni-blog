import { mountSuspended} from '@nuxt/test-utils/runtime'
import Header from "/components/Header.vue"
import {expect,test} from "vitest";

test("Header can render correctly",async ()=>{
    const component=await mountSuspended(Header);

    expect(component.text()).toMatch(/Home/i);
});
