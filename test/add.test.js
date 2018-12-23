import { createAddPasswordAction } from '../src/js/redux/action';
import { store } from '../src/js/redux/store';
import { PasswordModel } from '../src/js/model/model';

test('Add Password', () => {
    let model = new PasswordModel("testname", "testaccount", "testpassword");
    let addAction = createAddPasswordAction(model);
    
    store.dispatch(addAction);
    expect(store.getState().get('passwordList').get(0)).toBe(model);

    model = new PasswordModel("testname2", "testaccount2", "testpassword2");
    addAction = createAddPasswordAction(model);
    store.dispatch(addAction);
    
    expect(store.getState().get('passwordList').get(1)).toBe(model);
    expect(store.getState().get('passwordList').size).toBe(2);
    
});
