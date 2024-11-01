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
        * Method to intially posts.
        * @param commit
        * @param state
        */
       async loadPosts({commit,state})
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
       async fetchPosts({commit,state},lastPostId:number)
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
       },
       async getPost_old({commit,state},postId:number)
       {
           console.log("loading single post..=>"+postId);
           const {data,error}=await useFetch(`${state.baseUrl}/posts/get/${postId}`);
           console.log(data.value);
           if(error.value===null)
           {

               var d=data.value;
               /**
                * Add each fetched post in the store.
                */
               /**
                * Instantiate a new Post object.
                */
               const post=new Post();
               post.id=d.id;
               post.title=d.title;
               post.userId=d.userId;
               post.body=d.body;

               /**
                * Save this post in the store.
                */
               commit("ADD_POST",post);
               console.log("loaded the single post..=>"+post.title);
           }
           else
           {
               console.log("Errorrr");
               console.log(error.value);
           }
       },
       async getPost_old({commit,state},postId:number)
       {
           console.log("loading single post..=>"+postId);
           const {data,error}=await useFetch(`${state.baseUrl}/posts/get/${postId}`);
           console.log(data.value);
           if(error.value===null)
           {

               var d=data.value;
               /**
                * Add each fetched post in the store.
                */
               /**
                * Instantiate a new Post object.
                */
               const post=new Post();
               post.id=d.id;
               post.title=d.title;
               post.userId=d.userId;
               post.body=d.body;

               /**
                * Save this post in the store.
                */
               commit("ADD_POST",post);
               console.log("loaded the single post..=>"+post.id);
           }
           else
           {
               console.log("Errorrr");
               console.log(error.value);
           }

       },
       async getPost({commit,state},postId:number)
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

               commit("ADD_POST",post);
           }
           catch(error)
           {
               throw error;
           }


       }


   }
});

export default store;