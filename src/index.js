import DriveAppsUtil from 'drive-apps-util';
import URLSafeBase64 from 'urlsafe-base64';
import MarterialDesign from 'material-design-lite';
import doT from 'dot';
import {PasswordList, PasswordModel} from './model';
import Clipboard from 'clipboard';

let cardTemplate = doT.template(document.getElementById("card-template").innerHTML);
let pwdList = new PasswordList();
new Clipboard(".clipboard");


document.getElementById('splash').style.visibility = "hidden";

document.querySelector("#bt_new").addEventListener('click', (e) => {
  var name = document.querySelector("#newname").value;
  var account = document.querySelector("#newaccount").value;
  var password = document.querySelector("#newpassword").value;
   
  var data = new PasswordModel(name, account, password);
 
  pwdList.add(data);
  document.querySelector("#newname").value="";
  document.querySelector("#newaccount").value="";
  document.querySelector("#newpassword").value="";
  document.querySelector("#newname").parentElement.classList.remove("is-dirty");
  document.querySelector("#newaccount").parentElement.classList.remove("is-dirty");
  document.querySelector("#newpassword").parentElement.classList.remove("is-dirty");
});

let addNewItem = function(index, newItem) {
  var newElement = document.createElement("div");
  newItem.index=index;
  newElement.innerHTML = cardTemplate(newItem);
  newElement.querySelector(".bt_delete").addEventListener('click', (e) => {
    var index = e.currentTarget.getAttribute("index");
    pwdList.remove(index);
  });
  document.querySelector('.mdl-grid').appendChild(newElement.firstElementChild);
}
pwdList.registerAddListener(addNewItem);

let addRemoveItem = function(index, removeItem) {
  var element = document.querySelector("#card_" + index);
  element.parentElement.removeChild(element);
}
pwdList.registerRemoveListener(addRemoveItem);


let options = {
  "clientId": "145940141011-udiukcp2nk8tg4vdjeavefdhns7g109r.apps.googleusercontent.com",
  "scope": [
    "profile",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.install"
  ]
};

let driveAppsUtil = new DriveAppsUtil(options);
driveAppsUtil.init().then(() => {
  driveAppsUtil.login().then((user) => {
    showUserImage();
    loadPasswordDB();
    showInfoMessage("Password DB loaded");

  });
});

document.querySelector("#bt_save").addEventListener('click', (e) => {
  localStorage.setItem("passworddb", pwdList.export());  
  showInfoMessage("Password saved");
});

function loadPasswordDB() {
  pwdList.import(localStorage.getItem("passworddb"));
}

function showUserImage() {
  document.getElementById('userimage').classList.remove("is-hidden");
  document.getElementById('userimage').classList.add("visible");
  document.getElementById('userimage').src = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
}


function showErrorMessage(message) {
  if (typeof message.status !== 'undefined') {
    if (message.status === 404) {
      message = 'Password db not found.';
    }

  }
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: message,
      timeout: 10000
    }
  );
}

function showInfoMessage(message) {
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: message
    }
  );
}
