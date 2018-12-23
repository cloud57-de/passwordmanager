/*
 * action types
 */

export const ADD_PASSWORD = 'ADD_PASSWORD';
export const REMOVE_PASSWORD = 'REMOVE_PASSWORD';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';
export const CHANGE_MASTERPASSWORD = 'CHANGE_MASTERPASSWORD';
export const IMPORT_PASSWORDLIST = 'IMPORT_PASSWORDLIST';
export const SET_MASTERPASSWORD = 'SET_MASTERPASSWORD';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';
export const CHANGE_FILENAME = 'CHANGE_FILENAME';


/*
 * action creators
 */

export function createAddPasswordAction(model) {
  return { type: ADD_PASSWORD, model }
}

export function createRemovePasswordAction(id) {
  return { type: REMOVE_PASSWORD, id }
}

export function createEditPasswordAction(model) {
    return { type: EDIT_PASSWORD, model}
}

export function createChangeMasterPasswordAction(newPasswd) {
    return { type: CHANGE_MASTERPASSWORD, newPasswd}
}

export function createImportPasswordListAction(passwordList) {
  return { type: IMPORT_PASSWORDLIST, passwordList }
}

export function createSetMasterPasswordAction(password) {
  return { type: SET_MASTERPASSWORD, password};
}

export function createResetNotificationAction() {
  return { type: RESET_NOTIFICATION};
}

export function createChangeFileNameAction(name) {
  return { type: CHANGE_FILENAME, name};
}