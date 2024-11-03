import {useStore} from "vuex";
import Post from "~/store/models/Post";
import {computed, ComputedRef} from "vue";
import Api from "~/http/Api";

export default function(postId:number)
{
    /**
     * Store.
     */
    const store=useStore();
    /**
     * Post to view.
     */
    const post: ComputedRef<Post | null> = computed<Post | null>(() => {
        const posts: Post[] = store.getters.GET_POSTS;

        const foundPost = posts.find(post => post.id === postId);

        if (foundPost)
        {
            return foundPost;
        }

        return null; //post not existing in the store  probably due to a page reload
    });

    /**
     * Method get the post to view from the server.
     */
    const loadPost=async ()=>{
        try
        {
            //await store.dispatch("getPost",postId);
            const post=await Api.getSinglePost(postId);
            /**
             * Save in store.
             */
            store.dispatch("saveSinglePost",post);
        }
        catch(error)
        {
            /**
             * Post not found.
             */
            throw error
        }
    };


    return {
        post,
        loadPost
    };
}