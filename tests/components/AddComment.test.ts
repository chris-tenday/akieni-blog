import {expect, test,describe,vi} from "vitest";
import AddComment from "/components/AddComment.vue"
import {mount} from "@vue/test-utils";
import {createStore} from "vuex";
import config from "/tests/StoreConfig";

/**
 * Mock the store.
 */
const actions={
    addComment:vi.fn(()=>true)
};
config.actions=actions;


/**
 * Reusable function to mount the component.
 */
async function mountComponent()
{
    return await mount(AddComment,{
        props:{
            postId:1
        },
        global:{
            plugins:[createStore(config)]
        }
    })
}

describe("Add comment feature:",()=>{
    test("AddComment can render",async ()=>{
        const comp=await mountComponent();

        expect(comp.exists()).toBe(true);
    });

    test("User can comment",async ()=>{

        const component=await mountComponent();

        /**
         * Monitor calls to the postComment function.
         */
        const postComment=vi.spyOn(component.vm,"postComment");

        /**
         * Fill the comment form and submit.
         */
        const comment =await component.find("#commentInput");
        comment.setValue("Hello world");
        await component.find("form").trigger("submit.prevent");

        /**
         * Asserts if the postComment function is being called on form submission.
         */
        expect(postComment).toHaveBeenCalled();

        expect(actions.addComment).toHaveBeenCalled();

        /**
         * Assert if the UI updated with new comment.
         */
        console.log(comment.html());
    });
});
