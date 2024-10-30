import {createStore} from "vuex";
import {states,getters,mutations} from "~/store/config";
import {useFetch} from "nuxt/app";
import {ref} from "vue";
import Post from "~/store/models/Post";

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
        async loadPosts({commit})
        {
            var baseUrl="http://127.0.0.1:8000/api";

            const {data,error}=await useFetch(`${baseUrl}/posts/get/0`);
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
       async fetchPosts({commit},lastPostId:number)
       {
           var baseUrl="http://127.0.0.1:8000/api";

           console.log("scrolled fetching now..=>"+lastPostId);
           $fetch(`${baseUrl}/posts/get/${lastPostId}`)
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

       }

   }
});

export default store;