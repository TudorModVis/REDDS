const questions = document.querySelectorAll('.overlay');

function openQuestion(event) {
    const question = event.target.parentNode;
    question.classList.toggle('open');
}

questions.forEach(question => {
    question.addEventListener('click', openQuestion);
})