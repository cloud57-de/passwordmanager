import DriveAppsUtil from 'drive-apps-util';
import URLSafeBase64 from 'urlsafe-base64';
import MarterialDesign from 'material-design-lite';
import doT from 'dot';


document.getElementById('splash').style.visibility = "hidden";

document.querySelector("#bt_new").addEventListener('click', (e) => {
  var cardTemplate = doT.template(document.getElementById("card-template").innerHTML);
  var data = {
    name: document.querySelector("#newname").value,
    account: document.querySelector("#newaccount").value,
    password: document.querySelector("#newpassword").value
  }
  var newElement = document.createElement("div");
  newElement.innerHTML = cardTemplate(data);
  document.querySelector('.mdl-grid').appendChild(newElement.firstElementChild);

  document.querySelector("#newname").value = "";
  document.querySelector("#newaccount").value = "";
  password: document.querySelector("#newpassword").value = "";
  componentHandler.upgradeAllRegistered();
});



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
  });
});

window.save = () => {
  convertToPNG().then((img) => {
    editor.saveXML({ format: true }, function (err, xml) {
      let metadata = JSON.stringify({
        name: document.getElementById('docinfo').value,
        mimeType: "application/bpmn+xml",
        contentHints: {
          thumbnail: {
            image: img,
            mimeType: "image/png"
          }
        }
      });
  
      driveAppsUtil.updateDocument(id, metadata, xml).then((fileinfo) => {
        document.getElementById('docinfo').value = fileinfo.name;
        document.getElementById('docinfodrawer').textContent = fileinfo.name;
        document.title = fileinfo.name;
        window.localStorage.setItem("bpmndoctitle", fileinfo.name);
        showInfoMessage("BPMN model stored")
      });
    });
  });

}

function create(folderId) {
  let initialDiagram =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                    'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                    'id="Definitions_1">' +
    '<bpmn:process id="Process_1" isExecutable="false">' +
      '<bpmn:startEvent id="StartEvent_1"/>' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
          '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
        '</bpmndi:BPMNShape>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';
  let metadata = JSON.stringify({
    name: "New Process",
    mimeType: "application/bpmn+xml",
    parents: [folderId]
  });
  driveAppsUtil.createDocument(metadata, initialDiagram).then((fileinfo) => {
    id = fileinfo.id;
    window.localStorage.setItem("bpmndoc", initialDiagram);
    loadViewer(initialDiagram);
    document.getElementById('docinfo').value = fileinfo.name;
    document.getElementById('docinfodrawer').textContent = fileinfo.name;
    document.title = fileinfo.name;
    window.localStorage.setItem("bpmndoctitle", fileinfo.name);
    showInfoMessage("New BPMN process created")

  });
}

function showUserImage() {
  document.getElementById('userimage').classList.remove("is-hidden");
  document.getElementById('userimage').classList.add("visible");
  document.getElementById('userimage').src = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
}

function loadViewer(text) {
}

var done = function (err) {

  if (err) {
    showErrorMessage('Error loading password db: ' + err);
  }
  else {
    showInfoMessage('Password db loaded');
  }
};

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
