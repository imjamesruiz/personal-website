// making resume clickable

document.getElementById("resume-button").addEventListener("click", function () {
    window.open(
        "https://drive.google.com/file/d/1L9kvSOUOAYozJECltSa5EVeunRDUFI5N/view?usp=sharing",
        "_blank"
    );
});

// initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initSwiper();
});

function initSwiper() {
    let currentIndex = 0;
    const wrapper = document.getElementById('swiperWrapper');
    const scrollbarDrag = document.getElementById('scrollbarDrag');
    const cards = document.querySelectorAll('.project-card');
    const totalCards = cards.length;
    const cardWidth = 380; 
    
    // calculate width
    function calculateVisibleCards() {
        const container = document.querySelector('.swiper-container');
        if (!container) return 1;
        
        const containerWidth = container.clientWidth - 160; 
        return Math.floor(containerWidth / cardWidth);
    }
    
    let maxVisibleCards = calculateVisibleCards();
    let maxIndex = Math.max(0, totalCards - maxVisibleCards);

    // initialize scrollbar
    updateScrollbar();

    function slideProjects(direction) {
        if (direction === 'next' && currentIndex < maxIndex) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();
    }

    function updateSlider() {
        const translateX = -currentIndex * cardWidth;
        wrapper.style.transform = `translateX(${translateX}px)`;
        updateScrollbar();
    }

    function updateScrollbar() {
        if (maxIndex <= 0) {
            scrollbarDrag.style.transform = 'scaleX(1) translateX(0%)';
            return;
        }
        
        const progress = currentIndex / maxIndex;
        const scaleX = maxVisibleCards / totalCards;
        const translatePercent = progress * 100;
        scrollbarDrag.style.transform = `scaleX(${scaleX}) translateX(${translatePercent}%)`;
    }

    window.slideProjects = slideProjects;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTranslate = 0;

    wrapper.addEventListener('mousedown', dragStart);
    wrapper.addEventListener('touchstart', dragStart);

    wrapper.addEventListener('mousemove', dragMove);
    wrapper.addEventListener('touchmove', dragMove);

    wrapper.addEventListener('mouseup', dragEnd);
    wrapper.addEventListener('touchend', dragEnd);
    wrapper.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        initialTranslate = -currentIndex * cardWidth;
        wrapper.style.transition = 'none';
    }

    function dragMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = currentX - startX;
        const newTranslate = initialTranslate + deltaX;
        
        wrapper.style.transform = `translateX(${newTranslate}px)`;
    }

    function dragEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        wrapper.style.transition = 'transform 0.3s ease';
        
        const deltaX = currentX - startX;
        const threshold = cardWidth / 3;
        
        if (deltaX > threshold && currentIndex > 0) {
            currentIndex--;
        } else if (deltaX < -threshold && currentIndex < maxIndex) {
            currentIndex++;
        }
        
        updateSlider();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            slideProjects('prev');
        } else if (e.key === 'ArrowRight') {
            slideProjects('next');
        }
    });

    wrapper.addEventListener('selectstart', (e) => {
        if (isDragging) e.preventDefault();
    });

    window.addEventListener('resize', () => {
        maxVisibleCards = calculateVisibleCards();
        maxIndex = Math.max(0, totalCards - maxVisibleCards);
        
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateSlider();
    });
}