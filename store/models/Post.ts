import Comment from "~/store/models/Comment";

export default class Post
{
    id:number;
    userId:number;
    title:string;
    body:string;
    author:string;
    image:string="/assets/img/img2.jpg";
}