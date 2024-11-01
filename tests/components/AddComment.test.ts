import {expect, test} from "vitest";
import AddComment from "/components/AddComment.vue"
import store from "/store/index"
import {mount} from "@vue/test-utils";


test("AddComment can render",async ()=>{
    const comp=await mount(AddComment,{
        props:{
            postId:1
        },
        global:{
            plugins:[store]
        }
    })

    expect(comp.exists()).toBe(true);
});