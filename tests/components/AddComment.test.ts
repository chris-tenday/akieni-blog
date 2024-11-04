import { describe, it, expect, vi ,beforeEach} from 'vitest';
import { mount } from '@vue/test-utils';
import AddComment from '/components/AddComment.vue';
import useComments from '~/composables/useComments';
import useNotification from '~/composables/useNotification';
import { createStore } from 'vuex';
import store from "/tests/StoreConfig"

/**
 * Let's mock these modules
 */
vi.mock('/composables/useComments');
vi.mock('/composables/useNotification');

const mockStore = createStore(store);

describe('CommentComponent', () => {
    let addCommentMock: any;
    let notifyMock: any;

    beforeEach(() => {
        addCommentMock = vi.fn();
        notifyMock = vi.fn();
        (useComments as any).mockReturnValue({ addComment: addCommentMock });
        (useNotification as any).mockReturnValue({ notify: notifyMock });
    });

    it('renders correctly', () => {
        const wrapper = mount(AddComment, {
            global: {
                plugins: [mockStore],
            },
            props: {
                postId: 1,
            },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('input#commentInput').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
    });

    it('calls addComment when form is submitted', async () => {
        const wrapper = mount(AddComment, {
            global: {
                plugins: [mockStore],
            },
            props: {
                postId: 1,
            },
        });

        /**
         * Fill the form and submit
         */
        await wrapper.find('input#commentInput').setValue('This is a comment.');
        await wrapper.find('form').trigger('submit.prevent');

        /**
         * Assert if the addComment method of useComments composable is being called.
         */
        expect(addCommentMock).toHaveBeenCalledWith('This is a comment.');
    });

    it('notifies on error if addComment returns null', async () => {
        addCommentMock.mockResolvedValueOnce(null); // Simulate an error response

        const wrapper = mount(AddComment, {
            global: {
                plugins: [mockStore],
            },
            props: {
                postId: 1,
            },
        });

        await wrapper.find('input#commentInput').setValue('This is a comment.');
        await wrapper.find('form').trigger('submit.prevent');

        expect(notifyMock).toHaveBeenCalledWith("Sorry!Error while saving your comment", "error");
    });

    it('clears the comment input on successful comment post', async () => {
        addCommentMock.mockResolvedValueOnce(1); // Simulate a successful response

        const wrapper = mount(AddComment, {
            global: {
                plugins: [mockStore],
            },
            props: {
                postId: 1,
            },
        });

        await wrapper.find('input#commentInput').setValue('This is a comment.');
        await wrapper.find('form').trigger('submit.prevent');

        /**
         * Asserts if the comment is indeed cleared.
         */
        expect(wrapper.vm.userComment).toBe('');
    });

});
