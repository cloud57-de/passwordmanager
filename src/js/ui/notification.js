import { resetNotification } from '../api/service';

export function showErrorMessage(message) {
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
    resetNotification();
  }
  
export function showInfoMessage(message) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
      {
        message: message,
        timeout: 1500
      }
    );
    resetNotification();
  }
  