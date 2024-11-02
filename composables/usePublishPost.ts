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
        try
        {
            return await store.dispatch("publishNewPost",post);

        }
        catch(error)
        {
            throw new Error("Error publishing your post.");
        }
    }

    return {
        publishPost,
    };
}