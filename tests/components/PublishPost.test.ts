import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PublishPost from '/components/PublishPost.vue'; // Adjust the path as necessary
import usePublishPost from '/composables/usePublishPost';
import useNotification from '/composables/useNotification';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import store from "/tests/StoreConfig";
import Post from "../../store/models/Post";

// Mock the composables and Vuex store
vi.mock('/composables/usePublishPost');
vi.mock('/composables/useNotification');

/**
 * Mock store.
 */
const mockStore = createStore(store);

/**
 * Mock the router for asserting whether is redirected to the section to view his published post.
 */
const mockRouter = createRouter({
    history: createWebHistory(),
    routes: [],
});

describe('PublishPost', () => {
    let publishPostMock: any;
    let notifyMock: any;

    beforeEach(() => {
        publishPostMock = vi.fn();
        notifyMock = vi.fn();
        (usePublishPost as any).mockReturnValue({ publishPost: publishPostMock });
        (useNotification as any).mockReturnValue({ notify: notifyMock });
    });

    it('renders correctly', () => {
        const wrapper = mount(PublishPost, {
            global: {
                plugins: [mockStore, mockRouter],
            },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('input#title').exists()).toBe(true);
        expect(wrapper.find('textarea#body').exists()).toBe(true);
        expect(wrapper.find('button#submitBtn').exists()).toBe(true);
    });

    it('publishes a post when form is submitted', async () => {
        const wrapper = mount(PublishPost, {
            global: {
                plugins: [mockStore, mockRouter],
            },
        });
        /**
         * Fill and submit the form
         */
        const post=new Post();
        post.title="Hello world";
        post.body="My post is wonderful";
        post.userId=1;
        await wrapper.find('input#title').setValue(post.title);
        await wrapper.find('textarea#body').setValue(post.body);
        await wrapper.find('form').trigger('submit.prevent');

        /**
         * Assert if the publish function is being called on user form submission
         */
        expect(publishPostMock).toHaveBeenCalledWith(post);
    });

    it('notifies on successful post publish', async () => {

        publishPostMock.mockResolvedValueOnce(1);

        /**
         * Simulate successful response with post ID
         * */
        const wrapper = mount(PublishPost, {
            global: {
                plugins: [mockStore, mockRouter],
            },
        });
        /**
         * Fill and submit the form
         */
        await wrapper.find('input#title').setValue('Post Title');
        await wrapper.find('textarea#body').setValue('This is the body of the post.');
        await wrapper.find('form').trigger('submit.prevent');

        /**
         * Asserts if the notification toast is being called.
         */
        expect(notifyMock).toHaveBeenCalledWith('Your post is published', 'success');

        /**
         * Asserts if the inputs are cleared on post publish success.
         */
        expect(wrapper.vm.title).toBe('');
        expect(wrapper.vm.body).toBe('');
    });

    it('notifies on failed post publish', async () => {
        publishPostMock.mockResolvedValueOnce(null); // Simulate a failed response

        const wrapper = mount(PublishPost, {
            global: {
                plugins: [mockStore, mockRouter],
            },
        });
        /**
         * Fill and submit the form.
         */
        await wrapper.find('input#title').setValue('Post Title');
        await wrapper.find('textarea#body').setValue('This is the body of the post.');
        await wrapper.find('form').trigger('submit.prevent');

        /**
         * If the post couldn't be published , the toast should display a warning message
         */
        expect(notifyMock).toHaveBeenCalledWith('Your post is not published', 'warning');
    });

    it('notifies on catch error', async () => {
        const errorMessage = 'Network error';
        publishPostMock.mockRejectedValueOnce(new Error(errorMessage)); /**  Simulate an error */

        const wrapper = mount(PublishPost, {
            global: {
                plugins: [mockStore, mockRouter],
            },
        });

        /**
         * Fill and submit this form
         */
        await wrapper.find('input#title').setValue('Post Title');
        await wrapper.find('textarea#body').setValue('This is the body of the post.');
        await wrapper.find('form').trigger('submit.prevent');

        /**
         * In case anything bad happen at server-side level , the toast should display an erron message
         */
        expect(notifyMock).toHaveBeenCalledWith(errorMessage, 'error');
    });
});
