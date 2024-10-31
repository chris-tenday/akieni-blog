import {useStore} from "vuex";
import User from "~/store/models/User";

export default function()
{
    const store=useStore();

    const registerAccount=(user:User)=>{
                                //"^[a-zA-Z0-9_.-]{1,}@/" //TODO: Validate the user email.
        //TODO:Validate the user password.
        /** simulate a wait time */
        setTimeout(()=>{
            /**
             * Store the user in the store.
             */
            store.commit("SET_USER",user);
        },5000);
    };
}