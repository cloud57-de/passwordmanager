import MaterialDesign from 'material-design-lite';
import { store } from './redux/store';
import { initGoogle, login, loadPasswordDB, setMasterPassword, importPasswordList, createNewPasswordDB, exportPasswordList, savePasswordDB, addPassword } from './api/service';
import { GOOGLE_INIT_SUCCESS, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOADDOCUMENT_SUCCESS, GOOGLE_FILEINFO_SUCCESS } from './redux/googleaction';
import { SET_MASTERPASSWORD, ADD_PASSWORD, REMOVE_PASSWORD, IMPORT_PASSWORDLIST, CHANGE_MASTERPASSWORD, WRONG_MASTERPASSWORD } from './redux/action';
import { showUserImage } from './ui/userimage';
import { setDocumentInfo } from './ui/fileinfo';
import { initMasterPasswordDialog, showMasterPasswordDialog } from './ui/masterpassword';
import { hideSplash } from './ui/splash';
import { initNewPassword, showPassword, showPasswordList } from './ui/password';
import { showErrorMessage, showInfoMessage } from './ui/notification';
import { initFileInfo } from './ui/fileinfo';


initMasterPasswordDialog();
initNewPassword();
initFileInfo();

let options = {
  "clientId": "540050774904-2uedmhp8t7vlktpsslq4ubt33gflq1m7.apps.googleusercontent.com",
  "scope": [
    "profile",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.install"
  ]
};

let logListener = () => {
  console.log("State: " + store.getState());
};

let gtagActionListener = () => {
  let state = store.getState();
  let actionType = state.get('actionType');
  if (typeof gtag === "function") {
    gtag('event', actionType);
  }
}
store.subscribe(gtagActionListener);

let gtagErrorListener = () => {
  let state = store.getState();
  if (state.has('errormsg')) {
    if (typeof gtag === "function") {
      gtag('event', 'exception', {
        'description': state.get('errormsg'),
        'fatal': false
      });
    }
  }
}
store.subscribe(gtagErrorListener);

let processFlowListener = () => {
  let state = store.getState();
  let actionType = state.get('actionType');
  if (actionType === GOOGLE_INIT_SUCCESS) {
    login();
  }
  else if (actionType === GOOGLE_LOGIN_SUCCESS) {
    showUserImage();
    if (window.location.search) {
      hideSplash();
      let stateURL = JSON.parse(decodeURI(window.location.search.substr(7)));
      if (stateURL.action === "open") {
        loadPasswordDB(stateURL.ids[0]);
      }
      else if (stateURL.action === 'create') {
        createNewPasswordDB("New Password DB", stateURL.folderId);
      }
    }
  }
  else if (actionType === GOOGLE_LOADDOCUMENT_SUCCESS || actionType === WRONG_MASTERPASSWORD) {
    showMasterPasswordDialog();
  }
  else if (actionType === SET_MASTERPASSWORD) {
    importPasswordList();
  }
  else if (actionType === CHANGE_MASTERPASSWORD) {
    savePasswordDB();
  }
  else if (actionType === ADD_PASSWORD || actionType === REMOVE_PASSWORD) {
    savePasswordDB();
  }
  else if (actionType === GOOGLE_FILEINFO_SUCCESS) {
    setDocumentInfo(state.get('googleDocument').get('fileinfo').name);
  }
  else if (actionType === IMPORT_PASSWORDLIST) {
    showPasswordList(store.getState().get('passwordList'));
  }

};
store.subscribe(processFlowListener);

let notificationListener = () => {
  let state = store.getState();
  if (state.has('infomsg')) {
    showInfoMessage(state.get('infomsg'));
  }
  if (state.has('errormsg')) {
    showErrorMessage(state.get('errormsg'));
  }
};
store.subscribe(notificationListener);

initGoogle(options);


