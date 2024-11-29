let currentIndex = 0;

async function loadImages() {
    try {
        const response = await fetch('ImagenesCremas.json');  // Ruta correcta para JSON
        if (!response.ok) {
            throw new Error("Error al cargar ImagenesCremas.json");
        }
        const data = await response.json();
        const carouselInner = document.getElementById('carousel-inner');

        data.images.forEach((src, index) => {
            const div = document.createElement('div');
            div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            const img = document.createElement('img');
            img.src = `../${src}`;  // Ajustamos la ruta para las imágenes
            img.alt = `Imagen ${index + 1}`;
            div.appendChild(img);
            carouselInner.appendChild(div);
        });
    } catch (error) {
        console.error(error.message);
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;
    slides.forEach((slide, i) => {
        slide.style.opacity = i === currentIndex ? '1' : '0';
    });
    document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex++;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex--;
    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    showSlide(currentIndex);
});
