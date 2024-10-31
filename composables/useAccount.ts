import {useStore} from "vuex";
import User from "~/store/models/User";
import useNotification from "~/composables/useNotification";

export default function()
{
    const store=useStore();

    const registerAccount=(user:User)=>{
                                //"^[a-zA-Z0-9_.-]{1,}@/" //TODO: Validate the user email.
        //TODO:Validate the user password.
        /** simulate a wait time */

        setTimeout(async ()=>{
            /**
             * Store the user in the store.
             */
            await store.commit("SET_USER",user);
            useNotification().display("You've successfully register on Akieni !");
        },5000);
    };

    return {
        registerAccount
    }
}