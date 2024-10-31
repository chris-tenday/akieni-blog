import {useStore} from "vuex";
import User from "~/store/models/User";
import useNotification from "~/composables/useNotification";

export default function()
{
    const {display:notify}=useNotification();
    const store=useStore();

    /**
     * Method to register a new user account.
     * @param user
     */
    const registerAccount=(user:User)=>{
                                //"^[a-zA-Z0-9_.-]{1,}@/" //TODO: Validate the user email.
        //TODO:Validate the user password.
        /** simulate a wait time */

        setTimeout(async ()=>{
            /**
             * Store the user in the store.
             */
            user.loggedIn=true;
            await store.commit("SET_USER",user);
            notify("You've successfully register on Akieni !");
        },2000);
    };

    /**
     * Method to logout .
     */
    const logout=(user:User)=>{
        /**
         * Mark the user as logged out.
         */
        user.loggedIn=false
        store.commit("SET_USER",user);
    };

    /**
     * Method to login.
     */
    const login=(email:string,password:string)=>{
        const user:User|null=store.getters.GET_USER;
        if(user===null)
        {
            notify("Email or Password incorrect!","danger");
        }
        else
        {
            if(user.email===email && user.password===password)
            {
                /**
                 * Mark the use as logged In and update the store.
                 */
                user.loggedIn=true;
                store.commit("SET_USER",user);
            }
            else
            {
                notify("Email or Password incorrect!","error");
            }

        }
    }


    return {
        registerAccount,
        logout,
        login
    }
}