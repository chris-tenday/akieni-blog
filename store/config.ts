/**
 * The states holding data to be used accross the app.
 */
import Post from "~/store/models/Post";
import Comment from "~/store/models/Comment";
import User from "~/store/models/User";

export const states={
    posts:[] as Post[],
    baseUrl:"http://127.0.0.1:8000/api", //TODO:Migrate this in a .env file
    comments:[] as Comment[],
    user:User
}

/**
 * Getters to giving use some flexibility when fetching data from store.
 */
export const getters={
    GET_POSTS: (state:any) : Post[] => state.posts /** get posts from the store */,
    GET_LASTPOSTID:(state:any) : number => (state.posts.length>0)? state.posts.at(-1).id : 0,
    GET_COMMENTS:(state:any) : Comment[] => state.comments,
    GET_USER:(state:any) : User|null =>{
        if(state.user===null || state.user.length===0)
        {
            if(process.client) /** this line of will only be executed on client-side environment */
            {
                /**
                 * Get user data from session storage and loads it in the store for use.
                 */
                var json=sessionStorage.getItem("user");
                if(json==undefined || json.length<1)
                {
                    return null;
                }
                state.user=new User().fromJSON(json);

            }
        }

        return state.user;
    }
}

/**
 * Mutations used to put data in each state.
 */
export const mutations={
    SET_POSTS:(state:any,posts:Post[]) => state.posts=posts, /** initial posts loaded in the store */
    ADD_POST:(state:any,post:Post) => state.posts.push(post) /** add a post in the store */,
    SET_COMMENTS_old:function(state:any,postId:number,comments:Comment[]){
        /**
         * Add the comments of a post in the store.
         */
        console.log("setting commments...=>"+state.posts.length);
        for(let i=0; i<state.posts.length; i++) //TODO:Improve this data searching algorithm.
        {
            console.log("match => "+i);
            if(state.posts[i].id==postId)
            {
                console.log("match found:"+state.posts[i].id);
                state.posts[i].comments=comments;
                console.log("CL:"+state.posts[i].title);
                break;
            }
            else
            {

            }
        }
    },
    STORE_COMMENT:(state,comment:Comment) => state.comments.push(comment),
    SET_USER:(state:any,user:User|null) =>{

        if(user!=null)
        {
            /**
             * Store the user in session storage.
             */
            sessionStorage.setItem("user",user.toJSON());
        }
        else
        {
            /**
             * Clear.
             */
            sessionStorage.removeItem("user");
        }
        state.user=user
    }
}