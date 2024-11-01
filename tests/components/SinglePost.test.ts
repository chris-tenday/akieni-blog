import { mountSuspended } from '@nuxt/test-utils/runtime'
import SinglePost from "/components/SinglePost.vue"
import {expect,test} from "vitest";
import Post from "/store/models/Post";

test("SinglePost can render",async ()=>{
    const post=new Post()
    post.id=1;
    post.userId=1
    post.title="How to pentest";
    post.body="You need to know assembly";

    /**
     * Mount the component and pass it a prop
     */
    const component=await mountSuspended(SinglePost,{
        props:{
            post:post
        }
    })

    /**
     * Asserts
     */
    expect(component.text()).toMatch(new RegExp(post.title, 'i'));
});