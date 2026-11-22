import { createChangeMasterPasswordAction } from '../src/js/redux/action';
import { store } from '../src/js/redux/store';

test('Change Master Password', () => {
    let oldPassword = store.getState().get('googleDocument').get('masterPassword');

    let changeAction = createChangeMasterPasswordAction("newpasswd");
    store.dispatch(changeAction);
    
    expect(store.getState().get('googleDocument').get('masterPassword')).not.toBe(oldPassword);
    expect(store.getState().get('googleDocument').get('masterPassword')).toBe("newpasswd");
    
});
