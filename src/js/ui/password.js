import { PasswordModel } from '../model/model';
import { addPassword, removepassword, getPassword } from '../api/service';
import doT from 'dot';
import Clipboard from 'clipboard';


let cardTemplate = doT.template(document.getElementById("card-template").innerHTML);
new Clipboard(".clipboard")

export function initNewPassword() {
    document.querySelector("#bt_new").addEventListener('click', (e) => {
        let name = document.querySelector("#newname").value;
        let account = document.querySelector("#newaccount").value;
        let newpassword = document.querySelector("#newpassword").value;

        let data = new PasswordModel(name, account, newpassword);
        addPassword(data);
        showPassword(data);

        document.querySelector("#newname").value = "";
        document.querySelector("#newaccount").value = "";
        document.querySelector("#newpassword").value = "";
        document.querySelector("#newname").parentElement.classList.remove("is-dirty");
        document.querySelector("#newaccount").parentElement.classList.remove("is-dirty");
        document.querySelector("#newpassword").parentElement.classList.remove("is-dirty");
    });

    document.querySelector("#bt_new_drawer").addEventListener('click', (e) => {
        let name = document.querySelector("#newnamedrawer").value;
        let account = document.querySelector("#newaccountdrawer").value;
        let newpassword = document.querySelector("#newpassworddrawer").value;

        let data = new PasswordModel(name, account, newpassword);
        addPassword(data);
        showPassword(data);
        document.querySelector("#newnamedrawer").value = "";
        document.querySelector("#newaccountdrawer").value = "";
        document.querySelector("#newpassworddrawer").value = "";
        document.querySelector("#newnamedrawer").parentElement.classList.remove("is-dirty");
        document.querySelector("#newaccountdrawer").parentElement.classList.remove("is-dirty");
        document.querySelector("#newpassworddrawer").parentElement.classList.remove("is-dirty");
    });

}

export function showPassword(newItem) {
    let newElement = document.createElement("div");
    newElement.innerHTML = cardTemplate(newItem);
    newElement.querySelector(".bt_delete").addEventListener('click', (e) => {
        removepassword(e.currentTarget.id);
        removePasswordCard(e.currentTarget.id);
    });

    newElement.querySelector(".bt_show_pwd").addEventListener('click', (e) => {
        showPwdMessage(getPassword(e.currentTarget.id).password);
    });
    document.querySelector('#passworditems').appendChild(newElement.firstElementChild);
}

export function removePasswordCard(id) {
    let element = document.querySelector("#card_" + id);
    element.parentElement.removeChild(element);
}

export function showPasswordList(list) {
    list.forEach((item) => {
        showPassword(item);
    });
}

function showPwdMessage(message) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
        {
            message: message,
            timeout: 2000
        }
    );
}