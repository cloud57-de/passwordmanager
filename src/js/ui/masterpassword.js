import { setMasterPassword } from '../api/service';

export function initMasterPasswordDialog() {
    document.querySelector("#bt_master").addEventListener('click', (e) => {
        document.getElementById('startpage').style.display = "none";
        let password = document.querySelector("#masterpassword").value;
        setMasterPassword(password);
        document.getElementById('main').style.visibility = "visible";
        document.getElementById('mainpage').style.visibility = "visible";
    });     
}

export function showMasterPasswordDialog() {
    document.getElementById('password_dialog').style.display = "block";
}