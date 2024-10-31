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

    /**
     * Method to return the string version of the object.
     */
    toJSON() : string
    {
        return JSON.stringify({
            userId:this.userId,
            name:this.name,
            email:this.email,
            password:this.password
        });
    }

    /**
     * Method to reconstruct the object from its string version
     */
    fromJSON(jsonString:string) : User
    {
        var obj=JSON.parse(jsonString);
        const user=new User();
        user.userId=obj.userId;
        user.name=obj.name;
        user.email=obj.email;
        user.password=obj.password;

        return user;
    }

    test()
    {
        console.log("tested func");
    }
}