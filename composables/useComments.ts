import {useStore} from "vuex";
import User from "~/store/models/User";

export default function(postId:number)
{
    const store=useStore();
    const user:User=store.getters.GET_USER;

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

    return {
      addComment
    };
}