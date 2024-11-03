import {useStore} from "vuex";
import User from "~/store/models/User";
import {computed, ComputedRef} from "vue";
import Api from "~/http/Api";

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
            //return await store.dispatch("addComment",comment);
            const id=await Api.addComment(comment);
            if(id===null)
            {
                return false;
            }
            comment.id=id;
            await store.dispatch("saveNewComments",comment);
            return true;

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

        //await store.dispatch("getComments",postId);
        const comments=await Api.getComments(postId);
       // console.log("received:"+comments)
        /**
         * Save in the store.
         */
        store.dispatch("saveComments",comments);
    };

    return {
        addComment,
        fetchComments,
        comments
    };
}