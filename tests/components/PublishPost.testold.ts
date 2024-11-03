import PublishPost from "/components/PublishPost.vue";
import {describe, expect, test, vi} from "vitest";
import {mount} from "@vue/test-utils";
import store from "/store/index"
import Post from "../../store/models/Post";
import User from "../../store/models/User";

describe("PublishPost component",()=>{
    test("Rendering",async ()=>{
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

    /**
     * Testing how the component integrates with the usePublishPost composable to publish a new post.
     */
    test("Publish a new post",async ()=>{
        store.getters={
            GET_USER:(state:any) : User|null =>{
                const user=new User();
                user.email="Chris";
                user.name="Chris";
                user.loggedIn=true;
                user.userId=1;
            }
        };
        /**
         * Mock a store dispatch function call
         * Mock the return value to be true/false
         */
        const action=vi.spyOn(store,"dispatch").mockResolvedValue(true);

        /**
         * Mount the component.
         */
        const component=mount(PublishPost,{
            global:{
                plugins:[store]
            }
        });

        const post = new Post();
        //post.id = 1;
        post.title = "Hello world";
        post.body = "My post is amazing";
        //post.userId = 1;

        /**
         * Fill up the form.
         */
        await component.find("#title").setValue(post.title);
        await component.find("#body").setValue(post.body);
        /**
         * Submit the form.
         */
        await component.find("form").trigger("submit.prevent"); // Await the trigger

        /**
         * Assert that the publish method was called
         */
        expect(action).toHaveBeenCalledWith("publishNewPost",post);

    });
});
