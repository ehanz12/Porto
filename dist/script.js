//navbar fixed
window.onscroll = () => {
    const navbar = document.querySelector('header');
    const fixedNav = navbar.offsetTop;
    const toTop = document.querySelector('#to-top'); 

    if (window.pageYOffset > fixedNav) {
        navbar.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else {
        navbar.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
}

// hamburger

const hamburger = document.querySelector('#hamburger');
const navmenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    navmenu.classList.toggle('hidden');
});

//klick diluar hamburger
// window.addEventListener('click', (e) => {
//     if (e.target !== hamburger && e.target !== navmenu) {
//         hamburger.classList.remove('hamburger-active');
//         navmenu.classList.add('hidden');
//     }
// });


//dark mode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme =  'light';
    }
});

//pindahan posisi toggle sesuai mode

if (localStorage.theme == 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        darkToggle.checked = true;
    }else {
        darkToggle.checked = false;
    }

//tampilkan paragraf tambahan
const toggleButton = document.querySelector('#toggle-button');
const additionalText = document.querySelector('#additionalTexl');

toggleButton.addEventListener('click', () => {
    if(additionalText.classList.contains('max-h-0')) {
        additionalText.classList.remove('max-h-0');
        additionalText.style.maxHeight = additionalText.scrollHeight + 'px';
        toggleButton.innerHTML = "sembunyikan";
    } else {
        additionalText.style.maxHeight = '0';
        setTimeout(() => {
        additionalText.classList.add('max-h-0');
        toggleButton.innerHTML = "Lihat Selengkapnya";
      }, 300);
    }
});