import { createAddPasswordAction, createReorderPasswordsAction } from '../src/js/redux/action';
import { createStore } from 'redux';
import { PasswordModel } from '../src/js/model/model';
import { passwordManagerApp, initialState } from '../src/js/redux/reducer';

let store;

beforeEach(() => {
    store = createStore(passwordManagerApp, initialState);
});

test('Reorder Passwords', () => {
    let model1 = new PasswordModel("first", "acc1", "pwd1");
    let model2 = new PasswordModel("second", "acc2", "pwd2");
    let model3 = new PasswordModel("third", "acc3", "pwd3");

    store.dispatch(createAddPasswordAction(model1));
    store.dispatch(createAddPasswordAction(model2));
    store.dispatch(createAddPasswordAction(model3));

    expect(store.getState().get('passwordList').get(0).name).toBe("first");
    expect(store.getState().get('passwordList').get(1).name).toBe("second");
    expect(store.getState().get('passwordList').get(2).name).toBe("third");

    // Move first (index 0) to index 2
    store.dispatch(createReorderPasswordsAction(0, 2));

    expect(store.getState().get('passwordList').get(0).name).toBe("second");
    expect(store.getState().get('passwordList').get(1).name).toBe("third");
    expect(store.getState().get('passwordList').get(2).name).toBe("first");

    // Move index 1 (third) to index 0
    store.dispatch(createReorderPasswordsAction(1, 0));

    expect(store.getState().get('passwordList').get(0).name).toBe("third");
    expect(store.getState().get('passwordList').get(1).name).toBe("second");
    expect(store.getState().get('passwordList').get(2).name).toBe("first");
});
