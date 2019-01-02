import { setMasterPassword, changeMasterPassword, showErrorMessage } from '../api/service';
import { dialogPolyfill } from 'dialog-polyfill';

let setPasswdDialog;

export function initMasterPasswordDialog() {
    setPasswdDialog =document.getElementById('dl_masterpassword');
    if (! setPasswdDialog.showModal) {
        if (dialogPolyfill instanceof 'function') {
            dialogPolyfill.registerDialog(setPasswdDialog);
        }
        else {
            window.dialogPolyfill.registerDialog(setPasswdDialog);
        }
    }
    document.getElementById('applypasswd').addEventListener('click', (e) => {
        setPasswdDialog.close();
        let password = document.getElementById("masterpassword").value;
        setMasterPassword(password);
    });

    let changePasswdDialog = document.getElementById('dl_changemasterpassword');
    if (! changePasswdDialog.showModal) {
        dialogPolyfill.registerDialog(changePasswdDialog);
    }
    document.getElementById('cancelchangepasswd').addEventListener('click', (e) => {
        changePasswdDialog.close();
        document.getElementById('oldmasterpassword').value = "";
        document.getElementById('changemasterpassword').value = "";
        document.getElementById('changemasterpassword_retype').value = "";
        document.getElementById('oldmasterpassword').parentElement.classList.remove("is-dirty");
        document.getElementById('changemasterpassword').parentElement.classList.remove("is-dirty");
        document.getElementById('changemasterpassword_retype').parentElement.classList.remove("is-dirty");
});
    document.querySelector("#bt_changepasswd").addEventListener('click', (e) => {
        changePasswdDialog.showModal();
    });
    document.getElementById('savechangepasswd').addEventListener('click', (e) => {
        let oldPasswd = document.getElementById('oldmasterpassword').value;
        let newPasswd = document.getElementById('changemasterpassword').value;
        let newPasswdRetype = document.getElementById('changemasterpassword_retype').value;
        if (newPasswd == newPasswdRetype) {
            changeMasterPassword(oldPasswd, newPasswd);
            changePasswdDialog.close();
            document.getElementById('oldmasterpassword').value = "";
            document.getElementById('changemasterpassword').value = "";
            document.getElementById('changemasterpassword_retype').value = "";
            document.getElementById('oldmasterpassword').parentElement.classList.remove("is-dirty");
            document.getElementById('changemasterpassword').parentElement.classList.remove("is-dirty");
            document.getElementById('changemasterpassword_retype').parentElement.classList.remove("is-dirty");
        }
        else {
            showErrorMessage("New password and retype new password are different");
        }

    });

}

export function showMasterPasswordDialog() {
    document.getElementById('startpage').style.display = "none";
    document.getElementById('main').style.visibility = "visible";
    document.getElementById('mainpage').style.visibility = "visible";
    setPasswdDialog.showModal();
}

