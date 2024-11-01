import {mountSuspended} from "@nuxt/test-utils/runtime";
import PublishPost from "/components/PublishPost.vue";
import {expect, test} from "vitest";

test("Publish post can render",async ()=>{
    /**
     * Mount the component.
     */
    const component=await mountSuspended(PublishPost);

    /**
     * asserts.
     */
    expect(component.text()).toMatch(/Publish/i);
});