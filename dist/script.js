//navbar fixed
window.onscroll = () => {
    const navbar = document.querySelector('header');
    const fixedNav = navbar.offsetTop;

    if (window.pageYOffset > fixedNav) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
}

// hamburger

const hamburger = document.querySelector('#hamburger');
const navmenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    navmenu.classList.toggle('hidden');
});