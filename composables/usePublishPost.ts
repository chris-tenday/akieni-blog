import Post from "~/store/models/Post";
import {useStore} from "vuex";

export default function()
{
    /**
     * Store.
     */
    const store=useStore();

    /**
     * Function used to publish a new post.
     * @param post
     */
    const publishPost=async (post:Post)=>{
        await store.dispatch("publishPost",post);
    }

    return {
        publishPost,
    };
}