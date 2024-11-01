import PublishPost from "/components/PublishPost.vue";
import {expect, test} from "vitest";
import {mount} from "@vue/test-utils";
import store from "/store/index"

test("Publish post can render",async ()=>{
    /**
     * Mount the component.
     */
    const component=await mount(PublishPost,{
        global:{
            plugins:[store]
        }
    });

    /**
     * asserts.
     */
    expect(component.exists()).toBe(true);
});