// noinspection TypeScriptValidateTypes

import {createStore} from "vuex";
import {states,getters,mutations} from "~/store/config";
import Post from "~/store/models/Post";
import Comment from "~/store/models/Comment";

const store=createStore({
   state:states,
   getters:getters,
   mutations:mutations,
   actions:
   {
       /**
        * Method to intially posts.
        * @param commit
        * @param state
        */
       async loadPosts({commit,state,getters})
       {
           try
           {
               const data=await $fetch(`${state.baseUrl}/posts/fetch/0`);
               data.map((d)=>{
                   /**
                    * Add each post into the store.
                    */
                   const post=new Post();
                   post.id=d.id;
                   post.title=d.title;
                   post.userId=d.userId;
                   post.body=d.body
                   post.author=d.author;
                   post.image=getters.GET_IMAGE; /** randomly set an image for the post */

                   commit("ADD_POST",post);
               });
           }
           catch (error)
           {
               throw error;
           }
       },
       /**
        * Method to fetch more posts and store them in the store.
        * @param commit
        * @param state
        * @param lastPostId => the last post ID that was fetched from server.
        */
       async fetchPosts({commit,state,getters},lastPostId:number)
       {
           try
           {
               const data=await $fetch(`${state.baseUrl}/posts/fetch/${lastPostId}`);
               data.map((d)=>{
                   /**
                    * Add each fetched post in the store.
                    */
                   const post=new Post();
                   post.userId=d.userId;
                   post.title=d.title;
                   post.body=d.body;
                   post.id=d.id;
                   post.author=d.author;
                   post.image=getters.GET_IMAGE; /** get a random image to attach to the post */

                   commit("ADD_POST",post);
               });
           }
           catch(error)
           {
               throw error;
           }
       },
       /**
        * Method to get comments of a post.
        * @param commit
        * @param state
        * @param postId
        */
       async getComments({commit,state},postId:number)
       {
           try
           {
               const data=await $fetch(`${state.baseUrl}/comments/get/${postId}`);
               data.map((d)=>{
                   const comment=new Comment();
                   comment.id=d.id;
                   comment.postId=d.postId;
                   comment.name=d.name;
                   comment.email=d.email;
                   comment.body=d.body;

                   /**
                    * Store each comment in the store.
                    */
                   commit("STORE_COMMENT",comment);
               });
           }
           catch(error)
           {
               throw error;
           }

       },
       /**
        * Method to publish a post.
        * @param commit
        * @param state
        * @param post
        * @return true => on success or false otherwise
        * @throws an error on any http error like 5xx,4xx,...etc.
        */
       async publishNewPost({commit,state},post:Post)
       {
           try
           {
               const response=await $fetch(`${state.baseUrl}/posts/publish`,{
                   method:"POST",
                   body:{
                       title:post.title,
                       body:post.body,
                       userId:post.userId
                   }
               });

               if(response.status!=="success")
               {
                   return false;
               }

               /**
                * Complete the post object with the ID.
                */
               post.id=response.id;

               /**
                * Store this new post in the store.
                */
               commit("ADD_POST",post);

               return true;

           }
           catch(error)
           {
               throw error;
           }
       },

       async addComment({commit,state},comment:Comment)
       {
           try
           {
               const response=await $fetch(`${state.baseUrl}/comments/add`,
                   {
                       method:"POST",
                       body:{
                           postId:comment.postId,
                           name:comment.name,
                           email:comment.email,
                           body:comment.body

                       }
                   })

               if(response.status!=="success")
               {
                   return false;
               }
               comment.id=response.id;
               /**
                * Store the comment in the store.
                */
               commit("STORE_COMMENT",comment);

               return true;
           }
           catch(error)
           {
               throw error;
           }
       },
       async getPost({commit,state,getters},postId:number)
       {
           try
           {
               const data=await $fetch(`${state.baseUrl}/posts/get/${postId}`);
               if(data.length===0)
               {
                   throw new Error("Post not found");
               }
               /**
                * Store this post in the store.
                */
               const post=new Post();
               post.id=data.id;
               post.title=data.title;
               post.userId=data.userId;
               post.body=data.body;
               post.author=data.author;
               //post.image=getters("GET_IMAGE"); /** get a random image to attach to the post */

               commit("ADD_POST",post);
           }
           catch(error)
           {
               throw error;
           }


       },

       savePosts({commit,state,getters},posts:Post[])
       {
           posts.map((d)=>{
               /**
                * Add each fetched post in the store.
                */
               const post=new Post();
               post.userId=d.userId;
               post.title=d.title;
               post.body=d.body;
               post.id=d.id;
               post.author=d.author;
               post.image=getters.GET_IMAGE; /** get a random image to attach to the post */

               commit("ADD_POST",post);
           });
       }

   }
});

export default store;