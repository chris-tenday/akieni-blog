/**
 * Composable for managing posts.
 * features: get posts
 *
 */
import {computed, ComputedRef, ref,watch} from "vue";
import {useStore} from "vuex";
import Post from "~/store/models/Post";
import {useRoute} from "vue-router";

export default function usePosts()
{
    /**
     * store.
     * @type {Store<any>}
     */
    const store=useStore();
    /**
     * State to maintain how much th user scrolled.
     */
    const scroll=ref(0);
    /**
     * State used to store the maximum scroll the user scrolled,
     * this is to prevent refetching the same set of posts
     */
    const maxScrolled=ref(0);
    /**
     * State to control the display of the loader view/icon ,when asynchronously loading data.
     */
    const loading=ref(false);


    /**
     * Function for fetching and loading posts into the store.
     */
    const initializeStore=async ()=>{

        await store.dispatch("loadPosts");
    }


    /**
     * Function to fetch posts on user scroll.
     */
    const fetchPosts=async () =>{
        loading.value=true;
        const id:number = store.getters.GET_LASTPOSTID; /** get last post ID on the store. */

        store.dispatch("fetchPosts",id).then(()=>{
            loading.value=false;
        });


    };

    /**
     * Handling user scroll.
     */
    const scrolling=() =>{
        scroll.value=window.scrollY
    };

    /**
     * Watch how much the user scrolled in order to fetch some data
     */
    watch(scroll,(newValue)=>{
        if((newValue - maxScrolled.value) > 1000)
        {
            maxScrolled.value=newValue
            /**
             * worth fetching new data.
             */
            fetchPosts();
        }
    });

    /**
     * Return these properties for use by caller.
     */
    return {
        initializeStore,
        posts:store.getters.GET_POSTS,
        scrolling,
        loading
    }
}