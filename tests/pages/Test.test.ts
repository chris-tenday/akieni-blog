import {expect, test,vi} from "vitest";
import {mount} from "@vue/test-utils";
import Test from "/pages/test.vue";
import {createStore} from "vuex";
import User from "../../store/models/User";


test('Test page form submission', async () => {
    const store=createStore({
        getters:{
            GET_USER:()=>{
                const user =new User();
                user.userId=1;
                user.email="c@gmail.";
                user.name="Hey";

                return user;
            }
        }
    });
    // Mount the component
    const component = mount(Test,{
        global:{
            plugins:[store]
        }
    });

    expect(component.exists()).toBe(true);

    // Spy on the register function
    const testFunc = vi.spyOn(component.vm, 'publish');

    // Fill in the form fields
    await component.find('#title').setValue('Chris');
    await component.find('#body').setValue('12345');

    // Trigger the form submission
    await component.find('form').trigger('submit.prevent');

    // Assert that register was called
    expect(testFunc).toHaveBeenCalled();
});