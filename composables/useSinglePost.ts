import {useStore} from "vuex";
import {useRoute} from "vue-router";
import Post from "~/store/models/Post";
import {computed, ComputedRef, ref} from "vue";

export default function()
{
    /**
     * Store.
     */
    const store=useStore();
    /**
     * Route.
     */
    const {params}=useRoute();
    const postId=ref(params.id); //TODO: Validate this route param, it should be a valid number.
    /**
     * Post to view.
     */
    const post: ComputedRef<Post | null> = computed<Post | null>(() => {
        const posts: Post[] = store.getters.GET_POSTS;

        const foundPost = posts.find(post => post.id === 1);

        if (foundPost) {
            console.log("Found post in store...");
            return foundPost;
        }

        console.log("Post not found in store..");
        return null; // or return undefined;
    });

    /**
     * Comments.
     */
    const comments:ComputedRef<Comment[]>=computed<Comment[]>(()=>{
        var com=store.getters.GET_COMMENTS;
        var data:Comment[]=[];
        for(let i=0; i<com.length; i++) //TODO:Improve this data searching algorithm.
        {
            if(com[i].postId==postId.value)
            {
                data.push(com[i]);
            }
        }
        return data;
    });

    const fetchComments=async ()=>{
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
        addComment
    };
}