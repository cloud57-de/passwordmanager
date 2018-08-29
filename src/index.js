import DriveAppsUtil from 'drive-apps-util';
import URLSafeBase64 from 'urlsafe-base64';
import MarterialDesign from 'material-design-lite';
import doT from 'dot';
import { PasswordList, PasswordModel } from './model';
import Clipboard from 'clipboard';


let cardTemplate = doT.template(document.getElementById("card-template").innerHTML);
let pwdList = new PasswordList();
new Clipboard(".clipboard");


let id = "";

document.querySelector("#bt_new").addEventListener('click', (e) => {
  var name = document.querySelector("#newname").value;
  var account = document.querySelector("#newaccount").value;
  var password = document.querySelector("#newpassword").value;

  var data = new PasswordModel(name, account, password);

  pwdList.add(data);
  document.querySelector("#newname").value = "";
  document.querySelector("#newaccount").value = "";
  document.querySelector("#newpassword").value = "";
  document.querySelector("#newname").parentElement.classList.remove("is-dirty");
  document.querySelector("#newaccount").parentElement.classList.remove("is-dirty");
  document.querySelector("#newpassword").parentElement.classList.remove("is-dirty");
});

let addNewItem = function (newItem) {
  var newElement = document.createElement("div");
  newElement.innerHTML = cardTemplate(newItem);
  newElement.querySelector(".bt_delete").addEventListener('click', (e) => {
    pwdList.remove(e.currentTarget.id);
  });
  document.querySelector('.mdl-grid').appendChild(newElement.firstElementChild);
}
pwdList.registerAddListener(addNewItem);

let addRemoveItem = function (removeItem) {
  var element = document.querySelector("#card_" + removeItem.id);
  element.parentElement.removeChild(element);
}
pwdList.registerRemoveListener(addRemoveItem);


let options = {
  "clientId": "540050774904-tigjal4ghtm23hkkvp1edperl5n0n0s8.apps.googleusercontent.com",
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
    if (window.location.search) {
      document.getElementById('splash').style.visibility = "hidden";
      let state = JSON.parse(decodeURI(window.location.search.substr(7)));
      if (state.action === "open") {
        id = state.ids[0];
        loadPasswordDB(id);
      }
      else if (state.action === 'create') {
        create(state.folderId);
      }
    }
  });
});

function create(folderId) {
  let initialdb = "";
  let metadata = JSON.stringify({
    name: "New Password DB",
    mimeType: "application/cloud57-password-db",
    parents: [folderId]
  });
  driveAppsUtil.createDocument(metadata, initialdb).then((fileinfo) => {
    id = fileinfo.id;
    loadPasswordDB(id);
  });
}

document.querySelector("#bt_save").addEventListener('click', (e) => {

  let content = pwdList.export();
  let metadata = JSON.stringify({
    name: document.getElementById('docinfo').value,
    mimeType: "application/cloud57-password-db",
  });

  driveAppsUtil.updateDocument(id, metadata, content).then((fileinfo) => {
    document.getElementById('docinfo').value = fileinfo.name;
    document.getElementById('docinfodrawer').textContent = fileinfo.name;
    document.title = fileinfo.name;
    showInfoMessage("Password DB saved");
  });

});

function loadPasswordDB(id) {
  driveAppsUtil.getDocumentContent(id).then((text) => {
    pwdList.import(text);
  }, (reason) => {
    showErrorMessage(reason);
  });
  driveAppsUtil.getDocumentMeta(id).then((fileinfo) => {
    document.getElementById('docinfo').value = fileinfo.name;
    document.getElementById('docinfodrawer').textContent = fileinfo.name;
    document.title = fileinfo.name;
  }, (reason) => {
    showErrorMessage(reason);
  });

  showInfoMessage("Password DB loaded");
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
