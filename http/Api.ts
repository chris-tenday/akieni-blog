import axios from "/http/axios.js"
import Comment from "../store/models/Comment";
import Post from "../store/models/Post";

export default class Api
{
    private baseUrl:string="http://127.0.0.1:8000/api";

    /**
     * Load posts from Api request.
     * @return Post[]
     * @throws error in case of any server apis errors.
     */
    static async  loadPosts(lastPostId:number) : Promise<Post[]>
    {
        try
        {
            console.log("load posts...");
            //const data=await this.context.$fetch(`${this.baseUrl}/posts/fetch/0`);
            const response=await axios.get(`/posts/fetch/${lastPostId}`);

            const data=response.data
            var posts:Post[]=[];
            data.map((d)=>{
                /**
                 * Add each post into the store.
                 */
               const post=new Post();
                post.id=d.id;
                post.title=d.title;
                post.userId=d.userId;
                post.body=d.body
                post.author=d.author;
                //post.image=getters.GET_IMAGE; /** randomly set an image for the post */


                posts.push(post);

            });

            return posts;
        }
        catch (error)
        {
            console.log("error");
            console.log(error);
            throw error;
        }
    }

    /**
     * Get a single post from server.
     * @param postId
     */
    static async getSinglePost(postId:number) :Promise<Post>
    {
        try
        {
            const response=await axios.get(`/posts/get/${postId}`);
            const data=response.data;
            if(data.length===0)
            {
                throw new Error("Post not found");
            }

            const post=new Post();
            post.id=data.id;
            post.title=data.title;
            post.userId=data.userId;
            post.body=data.body;
            post.author=data.author;

            return post;

        }
        catch(error)
        {
            throw error;
        }
    }

    static async getComments(postId:number) : Promise<Comment[]>
    {
        try
        {
            const response=await axios.get(`/comments/get/${postId}`);
            const data=response.data;
            var comments:Comment[]=[];
            data.map((d)=>{
                const comment=new Comment();
                comment.id=d.id;
                comment.postId=d.postId;
                comment.name=d.name;
                comment.email=d.email;
                comment.body=d.body;

                comments.push(comment);
            });

            return comments;
        }
        catch(error)
        {
            throw new Error("Error !while fetching comments");
        }
    }

    static async publishNewPost(post) :Promise<number|null>
    {
        try
        {
            const response=axios.post("/posts/publish",{
                body:{
                    title:post.title,
                    body:post.body,
                    userId:post.userId
                }
            });

            if(response.data.status!=="success")
            {
                return null;
            }

            return response.data.id
        }
        catch(error)
        {
            throw error;
        }

    }

    static async addComment(comment:Comment) :Promise<number|null>
    {
        try
        {
            const response=await axios.post("/comments/add",{
                body:{
                    postId:comment.postId,
                    name:comment.name,
                    email:comment.email,
                    body:comment.body

                }
            });

            if(response.data.status!=="success")
            {
                return null;
            }
            return response.data.id;
        }
        catch(error)
        {
            throw error;
        }

    }

}