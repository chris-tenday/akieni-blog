import {useStore} from "vuex";
import {useRoute} from "vue-router";
import Post from "~/store/models/Post";
import {computed, ComputedRef, ref} from "vue";
import User from "~/store/models/User";

export default function(postId:number)
{
    /**
     * Store.
     */
    const store=useStore();
    /**
     * Route.
     */
    const {params}=useRoute();

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
     * Comments.
     */
    const comments:ComputedRef<Comment[]>=computed<Comment[]>(()=>{
        var com=store.getters.GET_COMMENTS;
        return com.filter(comment => comment.postId === postId);
    });

    const fetchComments_old=async ()=>{
        /**
         * If the post data is already available ,no need to fetch it again from server.
         */
        console.log("fetch comment=>"+post.value?.title)
        if(post.value==null)
        {
            console.log("post is null");
            /**
             * Fetch the post data.
             */
            await store.dispatch("getPost",postId.value);
        }

        //await store.dispatch("getComments",postId.value);
    };

    /**
     * Method get the post to view from the server.
     */
    const loadPost=async ()=>{
        /**
         * First the post first.
         */
        console.log("Post is not there");
        try
        {
            await store.dispatch("getPost",postId);
        }
        catch(error)
        {
            throw new Error("404");
        }
    };

    const fetchComments=async ()=>{

        await store.dispatch("getComments",postId);
    };


    const addComment=(comment:Comment)=>{
        const user:User=store.getters.GET_USER;
        comment.name=user.name; //TODO:Replace with the data of the connected user.
        comment.email=user.email; //TODO:Replace with the data of the connected user.
        store.dispatch("addComment",comment);
        //TODO:clear input after commented successfully
    }

    return {
        post,
        fetchComments,
        comments,
        addComment,
        loadPost
    };
}