import {
    ADD_PASSWORD,
    REMOVE_PASSWORD,
    EDIT_PASSWORD,
    CHANGE_MASTERPASSWORD,
    IMPORT_PASSWORDLIST,
    SET_MASTERPASSWORD,
    RESET_NOTIFICATION,
    CHANGE_FILENAME,
    SHOW_ERROR_NOTIFICATION,
    WRONG_MASTERPASSWORD,
    SET_FILTER,
    RESET_FILTER
} from "./action";
import {
    GOOGLE_INIT,
    GOOGLE_INIT_SUCCESS,
    GOOGLE_INIT_ERROR,
    GOOGLE_LOGIN,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_ERROR,
    GOOGLE_LOADDOCUMENT,
    GOOGLE_LOADNEWDOCUMENT,
    GOOGLE_LOADDOCUMENT_SUCCESS,
    GOOGLE_LOADDOCUMENT_ERROR,
    GOOGLE_FILEINFO_SUCCESS,
    GOOGLE_SAVEDOCUMENT_SUCCESS
} from './googleaction';

import { Map, List } from 'immutable';


export const initialState = Map({
    status: "uninitialized",
    googleDocument: Map({
        masterPassword: "",
        id: "",
        fileinfo: "",
        text: "",
        isLoaded: false
    }),
    passwordList: List(),
    actionType: ''
});



function passwordManagerApp(state = initialState, action) {
    let newState = state;
    let passwordList = state.get('passwordList');

    switch (action.type) {
        case RESET_NOTIFICATION:
            newState = state.delete('infomsg').delete('errormsg');
            break;
        case ADD_PASSWORD:
            newState = state.update('passwordList', (list) => list.push(action.model));
            break;
        case EDIT_PASSWORD:
            var index = passwordList.findKey(model => model.id == action.model.id);
            var newList = passwordList.set(index, action.model);
            newState = state.set('passwordList', newList);
            break;
        case REMOVE_PASSWORD:
            var index = passwordList.findKey(model => model.id == action.id);
            var newList = passwordList.remove(index);
            newState = state.set('passwordList', newList);
            break;
        case IMPORT_PASSWORDLIST:
            newState = state.set('passwordList', List(action.passwordList))
                .set('googleDocument', state.get('googleDocument').delete('text'))
                .set('infomsg', 'Import Password DB');
            break;
        case SET_FILTER:
            passwordList.forEach(model => {
                if (action.expression.length == 0 || model.name.toLowerCase().includes(action.expression.toLowerCase())) {
                    model.visible = true;
                }
                else {
                    model.visible = false;
                }
                let index = passwordList.findKey(item => item.id == model.id);
                passwordList = passwordList.set(index, model);
            });
            newState = state.set('passwordList', passwordList);
            break;
        case CHANGE_MASTERPASSWORD:
            newState = state.set('infomsg', "Masterpassword changed")
                .set('googleDocument', state.get('googleDocument')
                    .set('masterPassword', action.newPasswd)
                );
            break;
        case SET_MASTERPASSWORD:
            newState = state.set('googleDocument', state.get('googleDocument')
                .set('masterPassword', action.password)
            );
            break;
        case WRONG_MASTERPASSWORD:
            newState = state.set('status', 'wrong-masterpassword').set('errormsg', action.error);
            break;
        case CHANGE_FILENAME:
            let fileinfo = state.get('googleDocument').get('fileinfo');
            fileinfo.name = action.name;
            newState = state.set('googleDocument', state.get('googleDocument')
                .set('fileinfo', fileinfo)
            );
            break;
        case SHOW_ERROR_NOTIFICATION:
            newState = state.set('errormsg', action.error);
            break;
        case GOOGLE_INIT:
            newState = state.set('status', 'google-init-pending');
            break;
        case GOOGLE_INIT_SUCCESS:
            newState = state.set('status', 'google-init').set('infomsg', "Google API initialized");
            break;
        case GOOGLE_INIT_ERROR:
            newState = state.set('status', 'google-init-error').set('errormsg', action.error);
            break;
        case GOOGLE_LOGIN:
            newState = state.set('status', 'google-login-pending');
            break;
        case GOOGLE_LOGIN_SUCCESS:
            newState = state.set('status', 'google-login')
                .set('user', action.user)
                .set('infomsg', "Google Login successful");
            break;
        case GOOGLE_LOGIN_ERROR:
            newState = state.set('status', 'google-login-error').set('errormsg', action.error);
            break;
        case GOOGLE_LOADNEWDOCUMENT:
            newState = state.set('status', 'google-loaddocument-pending')
                .set('googleDocument', state.get('googleDocument')
                    .set('id', action.id)
                    .set('isLoaded', false)
                    .set('isnew', true)
                );
            break;
        case GOOGLE_LOADDOCUMENT:
            newState = state.set('status', 'google-loaddocument-pending')
                .set('googleDocument', state.get('googleDocument')
                    .set('id', action.id)
                    .set('isLoaded', false)
                );
            break;
        case GOOGLE_LOADDOCUMENT_SUCCESS:
            newState = state.set('status', 'google-loaddocument')
                .set('infomsg', "Password DB loaded")
                .set('googleDocument', state.get('googleDocument')
                    .set('fileinfo', action.fileinfo)
                    .set('text', action.text)
                    .set('isLoaded', true)
                );
            break;
        case GOOGLE_LOADDOCUMENT_ERROR:
            newState = state.set('status', 'google-loaddocument-error').set('errormsg', action.error);
            break;
        case GOOGLE_FILEINFO_SUCCESS:
            newState = state.set('status', 'google-fileinfo')
                .set('infomsg', "FileInfo loaded")
                .set('googleDocument', state.get('googleDocument')
                    .set('fileinfo', action.fileinfo)
                );
            break;
        case GOOGLE_SAVEDOCUMENT_SUCCESS:
            newState = state.set('status', 'google-filesaved')
                .set('infomsg', "Password DB saved")
                .set('googleDocument', state.get('googleDocument')
                    .set('fileinfo', action.fileinfo)
                );
            break;

        default:
            break;
    }
    return newState.set('actionType', action.type);
}

export { passwordManagerApp };