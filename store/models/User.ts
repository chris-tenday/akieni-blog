export default class User
{
    userId:number
    name:string;
    email:string;
    password:string

    constructor()
    {
        /**
         * Generate a unique random number as userId just for simulation .
         */
        this.userId=Math.floor(Math.random() * 10000);
    }
}