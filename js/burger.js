
// java script code

document.querySelector('.header-burger,.header-menu').addEventListener('click', toggleClass);

function toggleClass() {
    document.querySelector('.header-burger').classList.toggle('active');
    document.querySelector('.header-menu').classList.toggle('active');
}



// jquery code

// $(document).ready(function () {
//     $('.header-burger').click(function (event) {
//         $('.header-burger,.header-menu').toggleClass('active');
//         $('body').toggleClass('lock');
//     });
// });
