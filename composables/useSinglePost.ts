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
    const post:ComputedRef<Post>=computed<Post>(()=>{
        var posts:Post[]=store.getters.GET_POSTS;
        for(let i=0; i<posts.length; i++) //TODO:Improve this data searching algorithm.
        {
            if(posts[i].id==postId.value)
            {
                return posts[i];
            }
        }
        return new Post();
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
        await store.dispatch("getComments",postId.value);
    };

    return {
      post,
      fetchComments,
        comments
    };
}