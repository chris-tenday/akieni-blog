import { mountSuspended} from '@nuxt/test-utils/runtime'
import PublishPost from "/components/PublishPost.vue"
import {expect,test} from "vitest";

test("PublishPost can render correctly",async ()=>{
    const component=await mountSuspended(PublishPost);

    expect(component.text()).toMatch(/Publish/i);
});
