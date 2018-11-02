const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-btn');
const notifyUserBox = document.querySelector('.notifications')
const notifyUserTextContent = document.getElementById('notify-user');
const notifyUserBoxCloseButton = document.querySelector('.notification__closer');

notifyUserBox.style.display = 'none';

const passwordLengthChecker = () => {
    const password = passwordInput.value.trim();
    if (password.length < 6) {
        notifyUserBox.style.display = 'flex';
        notifyUserTextContent.innerText = `The password should be at least 6 characters long. Please use a longer password`
    } else {
        verifyUser();
    }
}

const verifyUser = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (sessionStorage.getItem('email') !== email && sessionStorage.getItem('password') !== password) {
        notifyUserBox.style.display = 'flex';
        notifyUserTextContent.innerText = `This user does not exist. Please visit the signup page to signup.`
    } else {
        setTimeout(() => {
            location.href = '../views/user/user-dashboard.html'
        }, 1000);
    }
}

loginButton.addEventListener('click', passwordLengthChecker);

notifyUserBoxCloseButton.addEventListener('click', () => {
    notifyUserTextContent.innerText = '';
    notifyUserBox.style.display = 'none';
})