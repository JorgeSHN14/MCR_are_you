const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const slideCount = slides.length;
let currentIndex = 0;
let touchStartY = 0;

const audioPlayer = document.querySelector('.music');

function showSlide(index) {
    if (index >= slideCount-1) {
        index = 0;
    } else {
        index++;
    }

    currentIndex = index;
    const translateValue = -slides[currentIndex].clientHeight*(currentIndex);
    carousel.style.transform = `translateY(${translateValue}px)`;
}

function nextSlide() {
    showSlide(currentIndex);
}

carousel.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

carousel.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (deltaY > 50) {
        prevSlide();
    } else if (deltaY < -50) {
        nextSlide();
    }

    touchStartY = 0;
});

let interval = setInterval(nextSlide, 2000);

function reproducirMusica() {
    audioPlayer.play();
}

function pausarMusica() {
    audioPlayer.pause();
}

function detenerMusica() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

(function() {
    let player = document.querySelector('.player');
    player.addEventListener('click',event => {
        if (!event.target.classList.contains("onPlay")){
            event.target.innerText= '⏸️ Summertime';
            reproducirMusica();
        } else{
            event.target.innerText= '▶️ Summertime';
            pausarMusica();
        }
        
        
        event.target.classList.toggle("onPlay");
    });
})();