/**
 * Composable for managing posts.
 * features: get posts
 *
 */
import {computed, ComputedRef, ref,watch} from "vue";
import {useStore} from "vuex";
import Post from "~/store/models/Post";

export default function usePosts()
{
    const scroll=ref(0);
    const loading=ref(false);

    /**
     * store.
     * @type {Store<any>}
     */
    const store=useStore();

    /**
     * Last post fetched and store in store.
     * @type {ComputedRef<unknown>}
     */
    const lastPostId:ComputedRef<number>=computed(()=>{
        const p=store.getters.GET_POSTS;
        return (p.length>0)? p.at(-1).id : 0 ; /** id of the last post */
    });

    /**
     * Function fetching and loading posts into the store.
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
        //store.dispatch("fetchPosts",id);


    };

    const scrolling=() =>{
        scroll.value=window.scrollY
    };

    /**
     * Watch how much the user scrolled in order to fetch some data
     */
    watch(scroll,(newValue)=>{
        if((newValue/2) >1000)
        {
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