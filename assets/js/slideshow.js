// Slideshow functionality
let currentIndex = 0;
const track = document.getElementById('slideshow-track');
const slides = track.querySelectorAll('.slide-item');
const totalSlides = slides.length;
const slidesToShow = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
const maxIndex = Math.max(0, totalSlides - slidesToShow);

function updateSlideshow() {
    const offset = -currentIndex * (100 / slidesToShow);
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === currentIndex ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    
    // Update buttons
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === maxIndex;
}

function moveSlide(direction) {
    currentIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction));
    updateSlideshow();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlideshow();
}

// Auto-advance slideshow
let autoAdvance = setInterval(() => {
    if (currentIndex < maxIndex) {
        moveSlide(1);
    } else {
        currentIndex = 0;
        updateSlideshow();
    }
}, 5000);

// Pause auto-advance on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(autoAdvance);
});

document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    autoAdvance = setInterval(() => {
        if (currentIndex < maxIndex) {
            moveSlide(1);
        } else {
            currentIndex = 0;
            updateSlideshow();
        }
    }, 5000);
});

// Initialize
updateSlideshow();

// Update on resize
window.addEventListener('resize', () => {
    const newSlidesToShow = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
    if (newSlidesToShow !== slidesToShow) {
        location.reload();
    }
});
