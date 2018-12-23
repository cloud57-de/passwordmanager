import { createAddPasswordAction, createRemovePasswordAction } from '../src/js/redux/action';
import { store } from '../src/js/redux/store';
import { PasswordModel } from '../src/js/model/model';

test('Remove Password', () => {
    let model1 = new PasswordModel("testname", "testaccount", "testpassword");
    let addAction = createAddPasswordAction(model1);
    store.dispatch(addAction);

    let model2 = new PasswordModel("testname2", "testaccount2", "testpassword2");
    addAction = createAddPasswordAction(model2);
    store.dispatch(addAction);
        
    let removeAction = createRemovePasswordAction(model2.id);
    store.dispatch(removeAction);
    expect(store.getState().get('passwordList').size).toBe(1);
    expect(store.getState().get('passwordList').get(0)).toBe(model1);

});
