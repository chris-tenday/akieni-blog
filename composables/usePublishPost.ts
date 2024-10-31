import Post from "~/store/models/Post";
import {useStore} from "vuex";
import {ref} from "vue";
import {useRouter} from "vue-router";

export default function()
{
    /**
     * Store.
     */
    const store=useStore();
    /**
     * router.
     */
    const router=useRouter();

    const loading=ref(false);

    /**
     * Function used to publish a new post.
     * @param post
     */
    const publishPost=async (post:Post)=>{
        loading.value=true;
        await store.dispatch("publishPost",post);
        loading.value=false;
        /**
         * View the published post.
         */
        //router.push(`/posts/${post.title}`);

    }

    return {
        publishPost,
        loading
    };
}