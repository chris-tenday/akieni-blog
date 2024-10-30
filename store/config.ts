/**
 * The states holding data to be used accross the app.
 */
import Post from "~/store/models/Post";

export const states={
    posts:[] as Post[]
}

/**
 * Getters to giving use some flexibility when fetching data from store.
 */
export const getters={
    GET_POSTS: (state:any) : Post[] => state.posts /** get posts from the store */,
    GET_LASTPOSTID:(state:any) : number => (state.posts.length>0)? state.posts.at(-1).id : 0
}

/**
 * Mutations used to put data in each state.
 */
export const mutations={
    SET_POSTS:(state:any,posts:Post[]) => state.posts=posts, /** initial posts loaded in the store */
    ADD_POST:(state:any,post:Post) => state.posts.push(post) /** add a post in the store */
}