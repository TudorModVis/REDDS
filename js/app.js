const favorite = document.querySelector('.favorite');
const favoriteButton = favorite.querySelector('.menu-btn');
const overlayFav = document.querySelector('.overlay.fav');
const heart = document.querySelector('header .heart')

function openFavorite() {
    setTimeout(() => {overlayFav.classList.toggle('open');}, 200);
    document.body.classList.toggle('open');
    favorite.classList.toggle('open');
}

favoriteButton.addEventListener('click', openFavorite);
heart.addEventListener('click', openFavorite);


// -------- Bikes ------- //

const bikes = [
    {
        'id':'bike1',
        'name':'Panigale V4',
        'img':'../images/HOME/image2.png',
        'motor':'v2',
        'moto':'clasic',
        'transmisie':'automata'
    },
    {
        'id':'bike2',
        'name':'Diavel V4 RS',
        'img':'../images/HOME/image 10.png',
        'motor':'v4',
        'moto':'clasic',
        'transmisie':'mecanica'
    },
    {
        'id':'bike3',
        'name':'Monster SP',
        'img':'../images/HOME/image3.png',
        'motor':'v4s',
        'moto':'sport',
        'transmisie':'automata'
    },
    {
        'id':'bike4',
        'name':'Streetfighter',
        'img':'../images/HOME/image 8.png',
        'motor':'v2',
        'moto':'atv',
        'transmisie':'mecanica'
    },
    {
        'id':'bike5',
        'name':'DesertX',
        'img':'../images/HOME/image 7.png',
        'motor':'v4',
        'moto':'sport',
        'transmisie':'automata'
    },
    {
        'id':'bike6',
        'name':'SuperSport',
        'img':'../images/HOME/image 6.png',
        'motor':'v4s',
        'moto':'sport',
        'transmisie':'mecanica'
    },
    {
        'id':'bike7',
        'name':'Multistrada',
        'img':'../images/HOME/image 11.png',
        'motor':'v2',
        'moto':'atv',
        'transmisie':'automata'
    },
    {
        'id':'bike8',
        'name':'Hypermotard',
        'img':'../images/HOME/image 4.png',
        'motor':'v4s',
        'moto':'clasic',
        'transmisie':'mecanica'
    }
];

// -------- Favourites Functionalities ------- //

const favoriteDiv = favorite.querySelector('.wrapper');
let favourites = [];

function getFavourites() {
    let temp = localStorage.getItem('favorite');
    favourites = JSON.parse(temp);

    if (favourites == null) {
        favourites = [];
        return;
    }
    addFavouritesBikes(favourites);
}

getFavourites();

function addFavourites(bike) {
    if (favourites == null || favourites.includes(bike)) return;

    favourites.push(bike);

    addFavouritesBikes(favourites);

    let favString = JSON.stringify(favourites);
    localStorage.setItem('favorite', favString);
}

function removeFavourites(bike) {
    const index = favourites.indexOf(bike);
    favourites.splice(index, 1);

    addFavouritesBikes(favourites);

    let favString = JSON.stringify(favourites);
    localStorage.setItem('favorite', favString);
}

function addFavouritesBikes(bikes) {
    favoriteDiv.replaceChildren();

    bikes.forEach(bike => {
        let div = document.createElement('div');
        div.classList.add('bike');
        div.id = bike.id;
        
        let image = document.createElement('img');
        image.classList.add('left');
        image.src = bike.img;

        let exit = document.createElement('img');
        exit.classList.add('exit');
        exit.src = '../images/CATALOG/x.svg';

        let title = document.createElement('h2');
        title.textContent = bike.name;

        let motor = document.createElement('p');
        motor.textContent = 'Motor: ' + bike.motor;

        let moto = document.createElement('p');
        moto.textContent = 'Tip: ' + bike.moto;

        let transmisie = document.createElement('p');
        transmisie.textContent = 'Transmisie: ' + bike.transmisie;

        let rightDiv = document.createElement('div');
        rightDiv.append(motor, moto, transmisie);

        let right = document.createElement('div');
        right.classList.add('right');
        right.append(title, rightDiv)

        div.append(exit, image, right);
        favoriteDiv.append(div);
    });
}