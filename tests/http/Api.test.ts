import { describe, it, expect, vi,afterEach } from 'vitest';
import axios from '/http/axios.js';
import Api from '/http/Api';
import Comment from '/store/models/Comment';
import Post from '/store/models/Post';

// Mock the axios module
vi.mock('/http/axios.js', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

describe('Api class', () => {
    afterEach(() => {
        // Clear any previous calls or reset the mocks
        vi.clearAllMocks();
    });

    it('should load posts', async () => {
        const mockPosts = [
            { id: 1, title: 'Post 1', userId: 1, body: 'Body 1', author: 'Author 1' },
            { id: 2, title: 'Post 2', userId: 2, body: 'Body 2', author: 'Author 2' },
        ];

        // Mock the axios.get method for the loadPosts call
        (axios.get as any).mockResolvedValueOnce({ data: mockPosts });

        const lastPostId = 0;
        const posts = await Api.loadPosts(lastPostId);

        expect(axios.get).toHaveBeenCalledWith(`/posts/fetch/${lastPostId}`);
        expect(posts).toHaveLength(2);
        expect(posts[0]).toBeInstanceOf(Post);
        expect(posts[0].id).toBe(1);
    });

    it('should get a single post', async () => {
        const mockPost = { id: 1, title: 'Post 1', userId: 1, body: 'Body 1', author: 'Author 1' };

        (axios.get as any).mockResolvedValueOnce({ data: mockPost });

        const postId = 1;
        const post = await Api.getSinglePost(postId);

        expect(axios.get).toHaveBeenCalledWith(`/posts/get/${postId}`);
        expect(post).toBeInstanceOf(Post);
        expect(post.id).toBe(1);
    });

    it('should get comments', async () => {
        const mockComments = [
            { id: 1, postId: 1, name: 'Commenter 1', email: 'email@example.com', body: 'Comment body 1' },
            { id: 2, postId: 1, name: 'Commenter 2', email: 'email2@example.com', body: 'Comment body 2' },
        ];

        (axios.get as any).mockResolvedValueOnce({ data: mockComments });

        const comments = await Api.getComments(1);

        expect(axios.get).toHaveBeenCalledWith(`/comments/get/1`);
        expect(comments).toHaveLength(2);
        expect(comments[0]).toBeInstanceOf(Comment);
    });

    it('should publish a new post', async () => {
        const mockResponse = { status: 'success', id: 1 };

        (axios.post as any).mockResolvedValueOnce({ data: mockResponse });

        const newPost = { title: 'New Post', body: 'New body', userId: 1 };
        const postId = await Api.publishNewPost(newPost);

        expect(axios.post).toHaveBeenCalledWith('/posts/publish', newPost);
        expect(postId).toBe(1);
    });

    it('should add a comment', async () => {
        const mockResponse = { status: 'success', id: 1 };
        const comment = new Comment();
        comment.postId = 1;
        comment.name = 'Commenter';
        comment.email = 'commenter@example.com';
        comment.body = 'This is a comment';

        (axios.post as any).mockResolvedValueOnce({ data: mockResponse });

        const commentId = await Api.addComment(comment);

        expect(axios.post).toHaveBeenCalledWith('/comments/add', {
            postId: comment.postId,
            name: comment.name,
            email: comment.email,
            body: comment.body,
        });
        expect(commentId).toBe(1);
    });
});
