let startX = 0;
let endX = 0;
let startTransform = 0;
let currentIndex = 0;
const slides = document.querySelectorAll('.timeline-item');
const slideWidth = slides[0].offsetWidth;

function moveSlide(n) {
    currentIndex += n;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    document.querySelector('.timeline-slide').style.transition = 'transform 0.5s ease'; // Adiciona uma transição suave
    document.querySelector('.timeline-slide').style.transform = `translateX(${-currentIndex * slideWidth}px)`;

    // Reinicia o carrossel para o primeiro slide após o último
    if (currentIndex === slides.length) {
        setTimeout(() => {
            document.querySelector('.timeline-slide').style.transition = 'none'; // Remove a transição para uma mudança instantânea
            document.querySelector('.timeline-slide').style.transform = `translateX(0px)`;
            currentIndex = 0;
        }, 500); // Tempo de espera correspondente à duração da transição
    }
}

document.querySelector('.timeline-wrapper').addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startTransform = parseFloat(getComputedStyle(document.querySelector('.timeline-slide')).getPropertyValue('transform').split(',')[4]);
    document.querySelector('.timeline-slide').style.transition = 'none'; // Remove a transição para um arrastar suave
    document.addEventListener('mousemove', handleMouseMove);
});

document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleMouseMove);
    let threshold = slideWidth / 4; // Define um limite de movimento para mudar de slide
    if (endX < startX - threshold) {
        moveSlide(1); // Move para o próximo slide
    } else if (endX > startX + threshold) {
        moveSlide(-1); // Move para o slide anterior
    } else {
        document.querySelector('.timeline-slide').style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Mantém o slide atual
    }
});

function handleMouseMove(e) {
    endX = e.clientX;
    let diff = endX - startX;
    document.querySelector('.timeline-slide').style.transform = `translateX(${startTransform + diff}px)`;
}

document.querySelector('.timeline-wrapper').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startTransform = parseFloat(getComputedStyle(document.querySelector('.timeline-slide')).getPropertyValue('transform').split(',')[4]);
});

document.querySelector('.timeline-wrapper').addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    let diff = endX - startX;
    document.querySelector('.timeline-slide').style.transform = `translateX(${startTransform + diff}px)`;
});

document.querySelector('.timeline-wrapper').addEventListener('touchend', () => {
    let threshold = slideWidth / 4; // Define um limite de movimento para mudar de slide
    if (endX < startX - threshold) {
        moveSlide(1); // Move para o próximo slide
    } else if (endX > startX + threshold) {
        moveSlide(-1); // Move para o slide anterior
    } else {
        document.querySelector('.timeline-slide').style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Mantém o slide atual
    }
});

// Verifica quando chega ao último slide para voltar ao primeiro
document.querySelector('.timeline-slide').addEventListener('transitionend', () => {
    if (currentIndex === slides.length) {
        setTimeout(() => {
            document.querySelector('.timeline-slide').style.transition = 'none'; // Remove a transição para uma mudança instantânea
            document.querySelector('.timeline-slide').style.transform = `translateX(0px)`;
            currentIndex = 0;
        }, 500); // Tempo de espera correspondente à duração da transição
    }
});

function aceitarCookies() {
    // Exemplo: armazenar no localStorage que os cookies foram aceitos
    localStorage.setItem('cookiesAceitos', 'true');
    // Ocultar o banner de consentimento
    document.getElementById('cookieConsent').style.display = 'none';
}

// Verificar se os cookies já foram aceitos anteriormente
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('cookiesAceitos') === 'true') {
        document.getElementById('cookieConsent').style.display = 'none';
    }
});





