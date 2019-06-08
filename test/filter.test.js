import { createAddPasswordAction, setFilterAction } from '../src/js/redux/action';
import { createStore } from 'redux';
import { PasswordModel } from '../src/js/model/model';
import { passwordManagerApp, initialState } from '../src/js/redux/reducer'; 

let store;
  
beforeEach( () => {
    store = createStore(passwordManagerApp, initialState);
});

test('Filter Password 1', () => {
    let model = new PasswordModel("testname", "testaccount", "testpassword");
    let addAction = createAddPasswordAction(model);
    store.dispatch(addAction);

    model = new PasswordModel("test1name", "test1account", "test1password");
    addAction = createAddPasswordAction(model);
    store.dispatch(addAction);

    let expression = "test1";
    let filterAction = setFilterAction(expression);
    store.dispatch(filterAction);
    store.getState().get('passwordList').forEach(model => {
        if (model.name.indexOf("test1") >= 0) {
            expect(model.visible).toEqual(true);
        }
        else {
            expect(model.visible).toEqual(false);
        }
    });
});

test('Filter Password 2', () => {
    let model = new PasswordModel("testname", "testaccount", "testpassword");
    let addAction = createAddPasswordAction(model);
    store.dispatch(addAction);

    model = new PasswordModel("test1name", "test1account", "test1password");
    addAction = createAddPasswordAction(model);
    store.dispatch(addAction);
    
    let expression = "test";
    let filterAction = setFilterAction(expression);
    store.dispatch(filterAction);
    store.getState().get('passwordList').forEach(model => {
        expect(model.visible).toEqual(true);
    });
});

test('Filter Password 3', () => {
    let model = new PasswordModel("testname", "testaccount", "testpassword");
    let addAction = createAddPasswordAction(model);
    store.dispatch(addAction);

    model = new PasswordModel("test1name", "test1account", "test1password");
    addAction = createAddPasswordAction(model);
    store.dispatch(addAction);
    
    let expression = "dfgfd";
    let filterAction = setFilterAction(expression);
    store.dispatch(filterAction);
    store.getState().get('passwordList').forEach(model => {
        expect(model.visible).toEqual(false);
    });
});
