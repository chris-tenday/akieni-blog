import Post from "~/store/models/Post";
import {useStore} from "vuex";
import Api from "~/http/Api";

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
            //return await store.dispatch("publishNewPost",post);

            const id=await Api.publishNewPost(post);
            if(id===null)
            {
                /**
                 * Save in store.
                 */
                post.id=id;
                await store.dispatch("saveSinglePost",post);
                return false
            }

            return true;


        }
        catch(error)
        {
            console.log(error);
            throw new Error("Error publishing your post.");
        }
    }

    return {
        publishPost,
    };
}