const button = document.querySelector('#submit');
const username = document.querySelector('form #username');
const password = document.querySelector('form #password');

const users = [
    {
        'username': 'tudor',
        'password': '1234'
    },
    {
        'username': 'tudorache',
        'password': '123'
    }
]

function logIn(event) {
    event.preventDefault();
    let check = false;

    users.forEach(user => {
        if (user.username == username.value && user.password == password.value) {
            window.open('pages/home.html', '_self');
            check = true;
            return;
        }
    });

    if (check == false) {
        window.alert('Username-ul sau parola au fost introduse gresit!')
    }
}

button.addEventListener('click', logIn);