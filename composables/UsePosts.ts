/**
 * Composable for managing posts.
 * features: get posts
 *
 */
import {computed, ComputedRef} from "vue";
import {useStore} from "vuex";
import Post from "~/store/models/Post";

export default function usePosts()
{
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

    return {
        initializeStore,
        posts:store.getters.GET_POSTS
    }
}