
// java script code

document.querySelector('.header-burger,.header-menu').addEventListener('click', toggleClass);

function toggleClass() {
    document.querySelector('.header-burger').classList.toggle('active');
    document.querySelector('.header-menu').classList.toggle('active');
}

