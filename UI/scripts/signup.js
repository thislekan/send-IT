const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordVerifierInput = document.getElementById('confirm-password')
const signUpButton = document.getElementById('signup-btn');
const notifyingParagraph = document.getElementById('notify-user');
const notificationBox = document.querySelector('.notifications');
const notificationBoxCloser = document.getElementById('notification-box-closer');

notificationBox.style.display = 'none';

const passwordLengthChecker = () => {
    const password = passwordInput.value.trim();
    if (password.length < 6) {
        notificationBox.style.display = 'flex';
        notifyingParagraph.innerText = `The password should be at least 6 characters long. Please use a longer password`;
    } else {
        signupUser()
    }
}

const signupUser = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordCheck = passwordVerifierInput.value.trim();

    if (!email || !password || !passwordCheck) {
        notificationBox.style.display = 'flex';
        notifyingParagraph.innerText = `Input field can't be empty. Confirm all input fields are filled.`;
    } else if (password !== passwordCheck) {
        notificationBox.style.display = 'flex';
        notifyingParagraph.innerText = `The password does not match. Please confirm that your password match.`
    } else {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        setTimeout(() => {
            location.href = '../views/login.html'
        }, 1000);
    }
}

signUpButton.addEventListener('click', passwordLengthChecker);

notificationBoxCloser.addEventListener('click', () => {
    notifyingParagraph.innerText = '';
    notificationBox.style.display = 'none';
})