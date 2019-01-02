import {
    createAddPasswordAction,
    createRemovePasswordAction,
    createEditPasswordAction,
    createChangeMasterPasswordAction,
    createImportPasswordListAction,
    createSetMasterPasswordAction,
    createResetNotificationAction,
    createChangeFileNameAction,
    createShowErrorNotificationActtion,
    createWrongPasswordAction
} from '../redux/action';
import { store } from '../redux/store';
import {
    createGoogleInitAction,
    createGoogleInitSuccessAction,
    createGoogleInitErrorAction,
    createGoogleLoginAction,
    createGoogleLoginSuccessAction,
    createGoogleLoginErrorAction,
    createGoogleLoadDocumentAction,
    createGoogleLoadNewDocumentAction,
    createGoogleLoadDocumentSuccessAction,
    createGoogleLoadDocumentErrorAction,
    createGoogleFileInfoAction,
    createGoogleFileInfoSuccessAction,
    createGoogleFileInfoErrorAction,
    createGoogleSaveDocumentAction,
    createGoogleSaveDocumentSuccessAction,
    createGoogleSaveDocumentErrorAction
} from '../redux/googleaction';

import DriveAppsUtil from 'drive-apps-util';
import { decrypt, encrypt } from './encryption';

let driveAppsUtil;

export function addPassword(model) {
    let addAction = createAddPasswordAction(model);
    store.dispatch(addAction);
}

export function removepassword(id) {
    let removeAction = createRemovePasswordAction(id);
    store.dispatch(removeAction);
}

export function editPassword(model) {
    let editAction = createEditPasswordAction(model);
    store.dispatch(editAction);
}

export function getPassword(id) {
    let passwordList = store.getState().get('passwordList');
    let index = passwordList.findKey(model => model.id == id);
    return passwordList.get(index);
}

export function importPasswordList() {
    let text = store.getState().get('googleDocument').get('text');
    let masterPassword = store.getState().get('googleDocument').get('masterPassword');
    if (text.length > 0) {
        decrypt(masterPassword, text).then((decrypted) => {
            try {
                let modelList = JSON.parse(decrypted);
                let importAction = createImportPasswordListAction(modelList);
                store.dispatch(importAction);
            }
            catch (error) {
                store.dispatch(createWrongPasswordAction('The masterpassword is not correct'));
            }
        });
    }
}

export function exportPasswordList() {
    return JSON.stringify(store.getState().get('passwordList').toJS());
}

export function changeMasterPassword(oldPasswd, newPasswd) {
    if (store.getState().get('googleDocument').get('masterPassword') == oldPasswd) {
        let changeMasterAction = createChangeMasterPasswordAction(newPasswd);
        store.dispatch(changeMasterAction);
    }
    else {
        store.dispatch(createShowErrorNotificationActtion('Password not changed, because the current password is not correct'));
    }
}

export function initGoogle(options) {
    store.dispatch(createGoogleInitAction(options));
    driveAppsUtil = new DriveAppsUtil(options);
    driveAppsUtil.init().then(() => {
        store.dispatch(createGoogleInitSuccessAction());
    }, (error) => {
        store.dispatch(createGoogleInitErrorAction(error));
    });
}

export function login() {
    if (driveAppsUtil != undefined) {
        store.dispatch(createGoogleLoginAction());
        driveAppsUtil.login().then((user) => {
            store.dispatch(createGoogleLoginSuccessAction(user));
        },
            (error) => {
                store.dispatch(createGoogleLoginErrorAction(error));
            });
    }
}

export function loadPasswordDB(id, isNew) {
    if (driveAppsUtil != undefined) {
        if (isNew) {
            store.dispatch(createGoogleLoadNewDocumentAction(id));
        }
        else {
            store.dispatch(createGoogleLoadDocumentAction(id));
        }
        driveAppsUtil.getDocumentContent(id).then((text) => {
            store.dispatch(createGoogleLoadDocumentSuccessAction(text));
            store.dispatch(createGoogleFileInfoAction());
            driveAppsUtil.getDocumentMeta(id).then((fileinfo) => {
                store.dispatch(createGoogleFileInfoSuccessAction(fileinfo));
            },
                (error) => {
                    store.dispatch(createGoogleFileInfoErrorAction(error));
                });
        },
            (error) => {
                store.dispatch(createGoogleLoadDocumentErrorAction(error));
            });
    }
}

export function setMasterPassword(password) {
    store.dispatch(createSetMasterPasswordAction(password));
}

export function createNewPasswordDB(name, folder) {
    let initialdb = "";
    let metadata = JSON.stringify({
        name: name,
        mimeType: "application/cloud57-password-db",
        parents: [folder]
    });
    driveAppsUtil.createDocument(metadata, initialdb).then((fileinfo) => {
        loadPasswordDB(fileinfo.id, true);
    });

}


export function savePasswordDB() {
    let content = exportPasswordList();
    let googleDocument = store.getState().get('googleDocument');
    let password = googleDocument.get('masterPassword');
    store.dispatch(createGoogleSaveDocumentAction());
    encrypt(password, content).then((encrypted) => {
        let metadata = JSON.stringify({
            name: googleDocument.get('fileinfo').name,
            mimeType: "application/cloud57-password-db",
        });

        driveAppsUtil.updateDocument(googleDocument.get('id'), metadata, encrypted).then((fileinfo) => {
            store.dispatch(createGoogleSaveDocumentSuccessAction(fileinfo));
        }, (error) => {
            store.dispatch(createGoogleSaveDocumentErrorAction(error));
        });
    }, (error) => {
        store.dispatch(createGoogleSaveDocumentErrorAction(error));
    });
}

export function changeFileName(name) {
    if (!name.endsWith(".passwd")) {
        name = name + ".passwd";
    }
    store.dispatch(createChangeFileNameAction(name));
    savePasswordDB();
}

export function showErrorMessage(error) {
    store.dispatch(createShowErrorNotificationActtion(error));
}

export function resetNotification() {
    store.dispatch(createResetNotificationAction());
}