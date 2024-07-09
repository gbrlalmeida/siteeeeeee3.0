let slideIndex = 0;
let slides = document.querySelectorAll('.carousel-item');
let slideWidth = slides[0].offsetWidth;
let totalSlides = slides.length;
let transitioning = false;

// Clone os primeiros slides para criar um efeito de loop contínuo
function cloneSlides() {
    const carouselInner = document.querySelector('.carousel-inner');
    const clonedSlides = [];

    // Clone cada slide e armazene-os em clonedSlides
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clonedSlides.push(clone);
        carouselInner.appendChild(clone);
    });

    // Atualize os slides para incluir os slides clonados
    slides = document.querySelectorAll('.carousel-item');
    totalSlides = slides.length;

    // Ajusta a largura do carrossel interno para conter todos os slides clonados
    carouselInner.style.width = `${totalSlides * slideWidth}px`;
}

// Move o slide para a esquerda ou direita
function moveSlide(n) {
    if (transitioning) return;
    transitioning = true;

    slideIndex += n;

    // Calcula o novo índice de slide
    let newIndex = slideIndex % totalSlides;
    if (newIndex < 0) {
        newIndex = totalSlides - 1;
    }

    // Move para o próximo slide
    document.querySelector('.carousel-inner').style.transform = `translateX(${newIndex * -slideWidth}px)`;
    
    // Adiciona transição
    document.querySelector('.carousel-inner').style.transition = 'transform 0.5s ease-in-out';

    // Define a variável de transição de volta para falso após a conclusão da transição
    setTimeout(() => {
        transitioning = false;
        
        // Reinicia o carrossel quando atinge o fim
        if (slideIndex >= totalSlides || slideIndex < 0) {
            slideIndex = newIndex;
            document.querySelector('.carousel-inner').style.transition = 'none';
            document.querySelector('.carousel-inner').style.transform = `translateX(${slideIndex * -slideWidth}px)`;
        }
    }, 500);
}

// Inicializa o carrossel
cloneSlides();
moveSlide(0);

// Muda automaticamente o slide a cada 3 segundos
setInterval(function() {
    moveSlide(1);
}, 3000);
