// -------- Menu -------- //

const menu = document.querySelector('.menu');
const menuButton = menu.querySelector('.menu-btn');
const contentButton = document.querySelector('.content .menu-btn');
const overlay = document.querySelector('.overlay');

function openMenu() {
    setTimeout(() => {overlay.classList.toggle('open');}, 200);
    document.body.classList.toggle('open');
    menu.classList.toggle('open');
}

menuButton.addEventListener('click', openMenu);
contentButton.addEventListener('click', openMenu);

// -------- Filter -------- //

const checkboxes = menu.querySelectorAll('input');
const grid = document.querySelector('.grid');

let filteredBikes = [], motor = ['v2', 'v4', 'v4s'], moto = ['clasic', 'atv', 'sport'], transmisie = ['mecanica', 'automata'], motorCheck = false, motoCheck = false, transCheck = false;

function filter (event) {
    const checkbox = event.target;

    if (checkbox.checked == true) {
        switch (checkbox.parentNode.parentNode.id) {
            case 'motor': {
                if (motorCheck == false) {
                    motor = [];
                    motorCheck = true;
                }
                motor.push(checkbox.id);
                break;
            }

            case 'moto': {
                if (motoCheck == false) {
                    moto = [];
                    motoCheck = true;
                }
                moto.push(checkbox.id);
                break;
            }

            case 'transmisie': {
                if (transCheck == false) {
                    transmisie = [];
                    transCheck = true;
                }
                transmisie.push(checkbox.id);
                break;
            }
        }
        filteredBikes = filterBikes(motor, moto, transmisie);
    } else {
        switch (checkbox.parentNode.parentNode.id) {
            case 'motor': {
                const index = motor.indexOf(checkbox.id);
                motor.splice(index, 1);
                if (motor.length == 0) {
                    motor = ['v2', 'v4', 'v4s'];
                    motorCheck = false;
                }
                break;
            }

            case 'moto': {
                const index = moto.indexOf(checkbox.id);
                moto.splice(index, 1);
                if (moto.length == 0) {
                    moto = ['clasic', 'atv', 'sport'];
                    motoCheck = false;
                }
                break;
            }

            case 'transmisie': {
                const index = transmisie.indexOf(checkbox.id);
                transmisie.splice(index, 1);
                if (transmisie.length == 0) {
                    transmisie = ['mecanica', 'automata'];
                    transCheck = false;
                }
                break;
            }
        }
        filteredBikes = filterBikes(motor, moto, transmisie);
    }
    addBikes(filteredBikes);
    bikeClick();
}

function filterBikes(motor, moto, transmisie) {
    return bikes.filter(function (el) {
        return motor.includes(el.motor) && moto.includes(el.moto) && transmisie.includes(el.transmisie);
    })
}

function addBikes(bikesTemp) {
    grid.replaceChildren();

    bikesTemp.forEach(bike => {
        let div = document.createElement('div');
        div.id = bike.id;
        let title = document.createElement('p');
        let image = document.createElement('img');
        image.classList.add('img');
        let heart = document.createElement('img');
        heart.classList.add('heart');
        heart.src = '../images/CATALOG/heart.png';

        title.textContent = bike.name;
        image.src = bike.img;

        let textDiv = document.createElement('div');

        textDiv.append(title, heart);
        div.append(image, textDiv);
        grid.append(div);
    });
}

addBikes(bikes);
bikeClick();

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', filter);
})

function bikeClick() {

    // -------- Grid Bikes -------- //

    const gridItems = document.querySelectorAll('.grid div .img');
    
    gridItems.forEach(item => {
        item.addEventListener('click', clickItem);
    });

    function clickItem() {
        window.open('bike.html');   
    }

    // -------- Hearts -------- //

    const hearts = document.querySelectorAll('.grid div .heart');

    hearts.forEach(heart => {
        heart.addEventListener('click', clickHeart);
    });

    function clickHeart(event) {
        let id = event.target.parentNode.parentNode.id;
        event.target.classList.toggle('active');

        if(event.target.classList.contains('active')) {
            addFavourites(findBikeById(id));
            addHearts(id);
        } else {
            removeFavourites(findBikeById(id));
            removeHearts(id);
        }

        refreshExits();
    }
}

function refreshExits() {
    let exits = document.querySelectorAll('.favorite .bike .exit');

    exits.forEach(exit => {
        exit.addEventListener('click', clickExit);
    });

    function clickExit(event) {
        let id = event.target.parentNode.id;

        removeFavourites(findBikeById(id));
        removeHearts(id);
        let heart = document.querySelector('.content #' + id);
        heart.querySelector('.heart').classList.remove('active');

        refreshExits();
    }
}

refreshExits();

let heartList = [];

function getHearts() {
    let temp = localStorage.getItem('hearts');
    heartList = JSON.parse(temp);
    if (heartList == null) {
        heartList = [];
        return;
    }

    addHeartsColor(heartList);
}

getHearts();

function addHearts(id) {
    if (heartList == null || heartList.includes(id)) return;
    heartList.push(id);

    let favString = JSON.stringify(heartList);
    localStorage.setItem('hearts', favString);
}

function removeHearts(id) {
    const index = heartList.indexOf(id);
    heartList.splice(index, 1);

    let favString = JSON.stringify(heartList);
    localStorage.setItem('hearts', favString);
}


function addHeartsColor(list) {
    list.forEach(item => {
        let heart = document.querySelector('.content #' + item)
        heart.querySelector('.heart').classList.add('active');
    })
}

function findBikeById(id) {
    return bikes.find(el => {
        return el.id == id;
    })
}

// -------- Bike Search -------- //

const search = document.querySelector('#search');

function searchBike() {
    let input = search.value.toLowerCase().trim();

    if (input == '') {
        addBikes(bikes);
        return;
    }

    addBikes(findBikeByName(input));
}

function findBikeByName(name) {
    return bikes.filter(function (el) {
        return el.name.toLowerCase().includes(name);
    })
}

search.addEventListener('keyup', searchBike);

