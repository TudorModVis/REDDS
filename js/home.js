// -------- Bike Carousell -------- //

const wrapper = document.querySelector('#models .carousel .wrapper');
const image = wrapper.querySelectorAll('div') ;

const circles = document.querySelectorAll('#models .circle');
let lastCircle = circles[0];

let index = 0;

function moveRight() {
    const width = image[0].clientWidth;
    index++;

    if (index >= circles.length) index = 0;

    wrapper.style.transform = 'translateX(' + index * -width + 'px)';

    lastCircle.classList.remove('active');
    circles[index].classList.add('active');
    lastCircle = circles[index];
}

setInterval(() => {
    if (window.innerWidth <= 1024) return;
    moveRight();
}, 3000);

function cirlceMove(event) {
    const width = image[0].clientWidth;
    
    lastCircle.classList.remove('active');
    event.target.classList.add('active');
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].classList.contains('active')) index = i;
        wrapper.style.transform = 'translateX(' + index * -width + 'px)';
    }
    lastCircle = event.target;
}

circles.forEach (circle => {
    circle.addEventListener('click', cirlceMove);
})

image.forEach(item => {
    item.addEventListener('click', () => {
        window.open('../pages/catalog.html')
    });
})


// -------- News Cards -------- //

const cards = document.querySelectorAll('.articles .card div');
let currentCard;

function enterCard(event) {
    currentCard = event.target;
}

function moveCard(event) {
    let x = (event.clientY / currentCard.clientHeight - 0.3 - 0.5) * 15;
    let y = (event.offsetX / currentCard.clientWidth - 0.5) * -15;

    currentCard.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
}

function leaveCard(event) {
    currentCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

cards.forEach(card => {
    card.addEventListener('mousemove', moveCard);
    card.addEventListener('mouseenter', enterCard);
    card.addEventListener('mouseleave', leaveCard);
});