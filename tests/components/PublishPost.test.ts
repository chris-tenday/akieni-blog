import PublishPost from "/components/PublishPost.vue";
import {describe, expect, test, vi,it} from "vitest";
import {mount} from "@vue/test-utils";
import store from "/store/index"
import Post from "../../store/models/Post";
import User from "../../store/models/User";
import {createStore} from "vuex";
import config from "/tests/StoreConfig"

// Create a mock Vuex store
const actions={
    publishNewPost:vi.fn(()=>true)
};
config.actions=actions;

/**
 * Reusable function to mount the component
 */
async function mountComponent()
{
    return await mount(PublishPost,{
        global:{
            plugins:[createStore(config)]
        }
    });
}


describe("PublishPost component",()=>{

    test("The component can render",async ()=>{
        /**
         * Mount the component.
         */
        const component=await mountComponent();

        /**
         * asserts.
         */
        expect(component.exists()).toBe(true);
    });

    test("the user can publish a new post",async ()=>{

        /**
         * Mount the component
         */
        const component=await mountComponent();
        /**
         * Monitor call to the publish method of the component
         */
        const publish=vi.spyOn(component.vm,"publish");

        /**
         * Fill up the form and submit
         */
        const post=new Post();
        post.userId=1;
        post.title="Hello title";
        post.body="Hello body";
        await component.find("#title").setValue(post.title);
        await component.find("#body").setValue(post.body);
        component.find("form").trigger("submit.prevent");

        /**
         * Asserts if the publish method is being called on form submission
         */
        expect(publish).toHaveBeenCalled();

        /**
         * Assert if the publishNewPost method of the vuex is being called with proper argument.
         */
        expect(actions.publishNewPost).toHaveBeenCalledWith(expect.any(Object),post);

    });

});


