// noinspection TypeScriptValidateTypes

import {createStore} from "vuex";
import {states,getters,mutations} from "~/store/config";
import {useFetch} from "nuxt/app";
import Post from "~/store/models/Post";
import Comment from "~/store/models/Comment";

const store=createStore({
   state:states,
   getters:getters,
   mutations:mutations,
   actions:
   {
       /**
        * Action method used to fetch and intialize posts from server to the store.
        * @param commit
        * @param lastPostId
        */
       async loadPosts({commit,state})
       {
            const {data,error}=await useFetch(`${state.baseUrl}/posts/get/0`);
            if(error.value===null)
            {

                var d=data.value;
                /**
                 * Add each fetched post in the store.
                 */
                for(let i=0; i<data.value.length; i++)
                {
                    /**
                     * Instantiate a new Post object.
                     */
                    const post=new Post();
                    post.id=d[i].id;
                    post.title=d[i].title;
                    post.userId=d[i].userId;
                    post.body=d[i].body;

                    /**
                     * Save this post in the store.
                     */
                    commit("ADD_POST",post);
                }

            }
            else
            {
                console.log("Errorrr");
                console.log(error.value);
            }
        },
       async fetchPosts({commit,state},lastPostId:number)
       {
           //console.log("scrolled fetching now..=>"+lastPostId);
           $fetch(`${state.baseUrl}/posts/get/${lastPostId}`)
               .then((data)=>{
                    console.log("fetched data success...");
                    console.log(data[0]);
                    for(let i=0; i<data.length; i++)
                    {
                        const post=new Post();
                        post.id=data[i].id;
                        post.title=data[i].title
                        post.body=data[i].body;
                        post.userId=data[i].userId;

                        /**
                         * Add this post to the store.
                         */
                        commit("ADD_POST",post);
                    }

               })
               .catch((error)=>{
                    console.log("error fetching...=>"+error.value);
               });

           //console.log(data.value);

       },
       /**
        * Method to get comments of a post.
        * @param commit
        * @param state
        * @param postId
        */
       async getComments({commit,state},postId:number)
       {
           console.log("id:"+postId);
           const {data,error}=await useFetch(`${state.baseUrl}/comments/get/${postId}`);
           if(error.value===null)
           {
               var d=data.value
               for(let i=0; i<d.length; i++)
               {
                   const comment=new Comment();
                   comment.id=d[i].id;
                   comment.postId=postId;
                   comment.name=d[i].name;
                   comment.email=d[i].email;
                   comment.body=d[i].body;
                   commit("STORE_COMMENT",comment);
               }
           }
           else
           {
               console.log("Error while getting post comments... =>"+error.value);
           }
       },
       /**
        * Method to publish a post.
        * @param commit
        * @param state
        * @param post
        */
       publishPost({commit,state},post:Post)
       {
           $fetch(`${state.baseUrl}/posts/publish`,{
               method:"POST",
               body:{
                   title:post.title,
                   body:post.body,
                   userId:1 //TODO:Replace this ID with the connected user ID.
               }
           })
               .then((data)=>{
                   /**
                    * Complete the post object with the ID.
                    */
                   post.id=data.id;

                   /**
                    * Store this new post in the store.
                    */
                   commit("ADD_POST",post);
                   callback(post.id);

               })
               .catch((error)=>{
                   console.log("Error while publishing post.");
               });
       },

       addComment({commit,state},comment:Comment)
       {
           $fetch(`${state.baseUrl}/comments/add`,
               {
                       method:"POST",
                       body:{
                           postId:comment.postId,
                           name:comment.name,
                           email:comment.email,
                           body:comment.body

                    }
           })
               .then((data)=>{
                   comment.id=data.id;
                   /**
                    * Store the comment in the store.
                    */
                   commit("STORE_COMMENT",comment);
               })
               .catch((error)=>{

               });
       }


   }
});

export default store;