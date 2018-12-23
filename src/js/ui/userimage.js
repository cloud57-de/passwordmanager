export function showUserImage() {
    document.getElementById('userimage').classList.remove("is-hidden");
    document.getElementById('userimage').classList.add("visible");
    document.getElementById('userimage').src = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
  }
  