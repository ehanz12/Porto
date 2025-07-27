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


// Form validation
function handleSubmit(event) {
    event.preventDefault(); // Mencegah pengiriman form default

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    let isValid = true;

    if(!name) {
        alert('Nama tidak boleh kosong');
        isValid = false;
    }
    if(!email) {
        alert('Email tidak boleh kosong');
        isValid = false;
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)) {
            alert('Email tidak valid');
            isValid = false;
        }
    }
    if(!message) {
        alert('Pesan tidak boleh kosong');
        isValid = false;
    }

    if(isValid){
        //konfirmasi Emailjs

        const templateParams = {
            from_name: name,
            to_name: email,
            message: message,
            reply_to: email
        };

        emailjs.init("x-vLtMYf9CmvsVxV5");

        //service ID, template ID, dan template params
        emailjs.send("service_k4vz9fg", "template_57lta1t", templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Pesan berhasil dikirim!');
                document.getElementById('contact-form').reset(); // Reset form setelah pengiriman
            }, function(error) {
                console.error('FAILED...', error);
                alert('Gagal mengirim pesan. Silakan coba lagi.');
        });
    }
}

AOS.init();