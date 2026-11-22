import { PasswordModel } from '../model/model';
import { addPassword, removepassword, getPassword, editPassword, reorderPasswords } from '../api/service';
import doT from 'dot';
import Clipboard from 'clipboard';
import dialogPolyfill from 'dialog-polyfill';


let cardTemplate = doT.template(document.getElementById("card-template").innerHTML);
new Clipboard(".clipboard")

let changePasswdDialog;

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

    let registerDialog = dialogPolyfill;

    changePasswdDialog = document.getElementById('dl_editpassword');
    if (!changePasswdDialog.showModal) {
        if (typeof dialogPolyfill !== "function") {
            registerDialog = window.dialogPolyfill
        }
        registerDialog.registerDialog(changePasswdDialog);
    }
    document.getElementById('editpasswd').addEventListener('click', (e) => {
        changePasswdDialog.close();
        let model = changePasswdDialog.model;
        model.password = document.getElementById("editpassword").value;
        editPassword(model);
        document.getElementById("editpassword").value = "";
    });

}

export function showPassword(newItem) {
    let newElement = document.createElement("div");
    newElement.innerHTML = cardTemplate(newItem);
    let card = newElement.firstElementChild;

    card.querySelector(".bt_delete").addEventListener('click', (e) => {
        removepassword(e.currentTarget.id);
        removePasswordCard(e.currentTarget.id);
    });

    card.querySelector(".bt_show_pwd").addEventListener('click', (e) => {
        showPwdMessage(getPassword(e.currentTarget.id).password);
    });

    card.querySelector(".bt_edit_pwd").addEventListener('click', (e) => {
        changePasswdDialog.model = getPassword(e.currentTarget.id);
        changePasswdDialog.showModal();
    });

    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', newItem.id);
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    card.addEventListener('dragenter', () => {
        card.classList.add('drag-over');
    });

    card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
    });

    card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        let sourceId = e.dataTransfer.getData('text/plain');
        let targetId = newItem.id;
        if (sourceId && targetId && sourceId !== targetId) {
            reorderPasswords(sourceId, targetId);
        }
    });

    document.querySelector('#passworditems').appendChild(card);
    componentHandler.upgradeDom('MaterialMenu', 'mdl-menu');
}

export function clearPasswordList() {
    let container = document.querySelector('#passworditems');
    if (container) {
        container.innerHTML = '';
    }
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

export function updatePassword(list) {
    list.forEach((item) => {
        let element = document.getElementById("card_" + item.id);
        let passwordButton = element.querySelector('.mdl-card__actions').getElementsByTagName('button').item(1)
        passwordButton.setAttribute("data-clipboard-text", item.password)
    });
}

export function updatePasswordList(list) {
    list.forEach((item) => {
        let element = document.querySelector("#card_" + item.id);
        if (item.visible){
            element.classList.remove("is-hidden");
        }
        else {
            element.classList.add("is-hidden");
        }
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

