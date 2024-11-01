import {useStore} from "vuex";
import {useRoute} from "vue-router";
import Post from "~/store/models/Post";
import {computed, ComputedRef, ref} from "vue";

export default function(postId:number) //TODO: Validate this route param, it should be a valid number.
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
        var data:Comment[]=[];
        for(let i=0; i<com.length; i++) //TODO:Improve this data searching algorithm.
        {
            if(com[i].postId===postId)
            {
                data.push(com[i]);
            }
        }
        return data;
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
        /**
         * If the post data is already available ,no need to fetch it again from server.
         */
        if(post.value===null)
        {

        }
        console.log("fetch comment=>");

        //await store.dispatch("getComments",postId.value);
    };


    const addComment=(comment:Comment)=>{
        comment.name="Chris Tenday"; //TODO:Replace with the data of the connected user.
        comment.email="tenday@gmail.com"; //TODO:Replace with the data of the connected user.
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