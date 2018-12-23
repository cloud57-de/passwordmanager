import { createAddPasswordAction, createEditPasswordAction } from '../src/js/redux/action';
import { store } from '../src/js/redux/store';
import { PasswordModel } from '../src/js/model/model';

test('Edit Password', () => {
    let model = new PasswordModel("testname", "testaccount", "testpassword");
    let addAction = createAddPasswordAction(model);
    
    store.dispatch(addAction);
    expect(store.getState().get('passwordList').get(0)).toBe(model);
    expect(store.getState().get('passwordList').size).toBe(1);

    model.account = "testaccount2";
    let editAction = createEditPasswordAction(model);
    store.dispatch(editAction);
    expect(store.getState().get('passwordList').get(0).account).toBe("testaccount2");

});
