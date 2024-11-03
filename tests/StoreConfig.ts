import User from "../store/models/User";


export default {
    getters: {
        GET_USER: () => {
            const user = new User();
            user.userId = 1;
            user.name = "Chris";
            user.email = "ct@gmail.com";
            user.loggedIn = true;
            return user;
        }
    },
    actions:{} /** to be defined later on each test */
}