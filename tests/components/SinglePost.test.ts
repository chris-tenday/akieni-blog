import SinglePost from "/components/SinglePost.vue"
import {expect,test} from "vitest";
import Post from "/store/models/Post";
import {mount} from "@vue/test-utils";

test("SinglePost can render",async ()=>{
    const post=new Post()
    post.id=1;
    post.userId=1
    post.title="How to pentest";
    post.body="You need to know assembly";

    /**
     * Mount the component and pass it a prop
     */
    const component=await mount(SinglePost,{
        props:{
            post:post
        }
    })

    /**
     * Asserts
     */
    expect(component.exists()).toBe(true);
});