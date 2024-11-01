import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import idPage from "/pages/posts/[id].vue"
import {mountSuspended} from "@nuxt/test-utils/runtime";

test("Viewing a Single page is Ok",async ()=>{
    const component=await mountSuspended(idPage);

    expect(component.exists()).toBe(true);
});