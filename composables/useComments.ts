import {useStore} from "vuex";
import User from "~/store/models/User";
import {computed, ComputedRef} from "vue";

export default function(postId:number)
{
    const store=useStore();
    const user:User=store.getters.GET_USER;

    /**
     * Comments.
     */
    const comments:ComputedRef<Comment[]>=computed<Comment[]>(()=>{
        var com=store.getters.GET_COMMENTS;
        return com.filter(comment => comment.postId === postId);
    });

    /**
     * Function to add a comment to a post
     * @param body
     */
    const addComment=async (body:string)=>{
        try
        {
            const comment=new Comment();
            comment.postId=postId;
            comment.name=user.name;
            comment.email=user.email;
            comment.body=body;
            await store.dispatch("addComment",comment);
        }
        catch(error)
        {
            throw error;
        }
    };

    /**
     * Functions get post comments.
     */
    const fetchComments=async ()=>{

        await store.dispatch("getComments",postId);
    };

    return {
        addComment,
        fetchComments,
        comments
    };
}