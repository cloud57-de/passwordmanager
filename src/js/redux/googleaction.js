export const GOOGLE_INIT = 'GOOGLE_INIT';
export const GOOGLE_INIT_SUCCESS = 'GOOGLE_INIT_SUCCESS';
export const GOOGLE_INIT_ERROR = 'GOOGLE_INIT_ERROR';

export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const GOOGLE_LOGIN_ERROR = 'GOOGLE_LOGIN_ERROR';

export const GOOGLE_LOADDOCUMENT = 'GOOGLE_LOADDOCUMENT';
export const GOOGLE_LOADNEWDOCUMENT = 'GOOGLE_LOADNEWDOCUMENT';
export const GOOGLE_LOADDOCUMENT_SUCCESS = 'GOOGLE_LOADDOCUMENT_SUCCESS';
export const GOOGLE_LOADDOCUMENT_ERROR = 'GOOGLE_LOADDOCUMENT_ERROR';

export const GOOGLE_FILEINFO = 'GOOGLE_FILEINFO';
export const GOOGLE_FILEINFO_SUCCESS = 'GOOGLE_FILEINFO_SUCCESS';
export const GOOGLE_FILEINFO_ERROR = 'GOOGLE_FILEINFO_ERROR';

export const GOOGLE_SAVEDOCUMENT = 'GOOGLE_SAVEDOCUMENT';
export const GOOGLE_SAVEDOCUMENT_SUCCESS = 'GOOGLE_SAVEDOCUMENT_SUCCESS';
export const GOOGLE_SAVEDOCUMENT_ERROR = 'GOOGLE_SAVEDOCUMENT_ERROR';

export function createGoogleInitAction(options) {
    return { type: GOOGLE_INIT };
}

export function createGoogleInitSuccessAction() {
    return { type: GOOGLE_INIT_SUCCESS };
}

export function createGoogleInitErrorAction(error) {
    return { type: GOOGLE_INIT_ERROR,  error };
}

export function createGoogleLoginAction() {
    return { type: GOOGLE_LOGIN };
}

export function createGoogleLoginSuccessAction(user) {
    return { type: GOOGLE_LOGIN_SUCCESS, user };
}

export function createGoogleLoginErrorAction(error) {
    return { type: GOOGLE_LOGIN_ERROR,  error };
}

export function createGoogleLoadDocumentAction(id) {
    return { type: GOOGLE_LOADDOCUMENT, id};
}

export function createGoogleLoadNewDocumentAction(id) {
    return { type: GOOGLE_LOADNEWDOCUMENT, id};
}

export function createGoogleLoadDocumentSuccessAction(text) {
    return { type: GOOGLE_LOADDOCUMENT_SUCCESS, text };
}

export function createGoogleLoadDocumentErrorAction(error) {
    return { type: GOOGLE_LOADDOCUMENT_ERROR,  error };
}

export function createGoogleFileInfoAction() {
    return { type: GOOGLE_FILEINFO};
}

export function createGoogleFileInfoSuccessAction(fileinfo) {
    return { type: GOOGLE_FILEINFO_SUCCESS, fileinfo };
}

export function createGoogleFileInfoErrorAction(error) {
    return { type: GOOGLE_FILEINFO_ERROR,  error };
}

export function createGoogleSaveDocumentAction() {
    return { type: GOOGLE_SAVEDOCUMENT};
}

export function createGoogleSaveDocumentSuccessAction(fileinfo) {
    return { type: GOOGLE_SAVEDOCUMENT_SUCCESS, fileinfo };
}

export function createGoogleSaveDocumentErrorAction(error) {
    return { type: GOOGLE_SAVEDOCUMENT_ERROR,  error };
}
