const displayStatusNotification = document.getElementById('status-notification');
const displayLocationNotification = document.getElementById('location-notification');
const notificationBox = document.querySelector('.notification-box');
const allNotificationBoxTerminators = document.querySelectorAll('.closer');
const confirmChangesButton = document.getElementById('confirm-changes');
const allButtons = document.querySelectorAll('button');

notificationBox.style.display = 'none';
displayLocationNotification.style.display = 'none';
displayStatusNotification.style.display = 'none';

for (let i = 0; i < allButtons.length; i++) {
    const element = allButtons[i];
    element.addEventListener('click', (event) => {
        const clickedButton = event.target
        if (clickedButton.getAttribute('data-action') === 'change-status') {
            displayLocationNotification.style.display = 'none'
            notificationBox.style.display = 'block';
            displayStatusNotification.style.display = 'block'
            confirmChangesButton.innerText = 'Confirm Status';
        } else {
            displayStatusNotification.style.display = 'none';
            notificationBox.style.display = 'block'
            displayLocationNotification.style.display = 'block';
            confirmChangesButton.innerText = 'Confirm Location';
        }
    });
}

for (let i = 0; i < allNotificationBoxTerminators.length; i++) {
    const element = allNotificationBoxTerminators[i];
    element.addEventListener('click', () => {
        notificationBox.style.display = 'none';
    })
}
