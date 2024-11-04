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
       },
       saveSinglePost({commit,state,getters},post:Post)
       {
           commit("ADD_POST",post);
       },
       saveComments({commit,state},comments:Comment[])
       {
           comments.map((d)=>{
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
       },
       saveNewComments({commit,state},comment)
       {
           /**
            * Store the comment in the store.
            */
           commit("STORE_COMMENT",comment);
       }

   }
});

export default store;