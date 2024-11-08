/**
 * The states holding data to be used accross the app.
 */
import Post from "~/store/models/Post";
import Comment from "~/store/models/Comment";
import User from "~/store/models/User";
import {useRuntimeConfig} from "nuxt/app";

export const states={
    posts:[] as Post[],
    baseUrl:"http://127.0.0.1:8000/api",
    comments:[] as Comment[],
    user:User,
    images:["/assets/img/img1.webp","/assets/img/img2.jpg","/assets/img/img3.jpg","/assets/img/img4.jpg","/assets/img/img5.png","/assets/img/img6.jpg","/assets/img/img7.jpg"]
}

/**
 * Getters
 */
export const getters={
    GET_POSTS: (state:any) : Post[] => state.posts /** get posts from the store */,
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
    },
    GET_IMAGE:(state:any): string =>{

        /**
         * Randomly pick an image to be set for a post
         * Simulation purpose only
         */
        const index=Math.floor(Math.random() * 7);
        return state.images[0];
    }
}

/**
 * Mutations used to put data in each state.
 */
export const mutations={
    SET_POSTS:(state:any,posts:Post[]) => state.posts=posts, /** initial posts loaded in the store */
    ADD_POST:(state:any,post:Post) => state.posts.push(post) /** add a post in the store */,
    STORE_COMMENT:(state,comment:Comment) => state.comments.push(comment),
    SET_USER:(state:any,user:User) =>{
        sessionStorage.setItem("user",user.toJSON()); /** save a copy in session storage for long persistence */
        state.user=user
    },
}