import Comment from "~/store/models/Comment";

export default class Post
{
    id:number;
    userId:number;
    title:string;
    body:string;
    comments:Comment[]=[];

}