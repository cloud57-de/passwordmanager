import { changeFileName } from "../api/service";

export function setDocumentInfo(name) {
    document.getElementById('docinfo').value = name;
    document.getElementById('docinfodrawer').value = name;
    document.title = name;
}

export function initFileInfo() {
    document.getElementById('docinfo').addEventListener('change', (e) => {
        changeFileName(e.currentTarget.value);
    });
    document.getElementById('docinfodrawer').addEventListener('change', (e) => {
        changeFileName(e.currentTarget.value);
    });
}