// Sélectionne l'élément du carrousel dans le HTML
const carousel = document.querySelector('.carousel');

// Sélectionne le bouton "Précédent" dans le HTML
const prevBtn = document.querySelector('.prev-btn');

// Sélectionne le bouton "Suivant" dans le HTML
const nextBtn = document.querySelector('.next-btn');

// Sélectionne toutes les images à l'intérieur du carrousel
const images = Array.from(carousel.querySelectorAll('img'));

// Sélectionne le bouton pour basculer entre les modes clair et sombre
const toggleButton = document.getElementById('toggle-dark-mode');

// Sélectionne l'élément "body" (tout le document HTML)
const body = document.body;

// Sélectionne le conteneur du carrousel
const carouselContainer = document.querySelector('.carousel-container');

// Clone les premières et dernières images pour la boucle
const firstImageClone = images[0].cloneNode(true);
const lastImageClone = images[images.length - 1].cloneNode(true);

carousel.appendChild(firstImageClone);
carousel.insertBefore(lastImageClone, images[0]);

// Réinitialise l'index à 1 (car nous avons ajouté un clone au début)
let index = 1;

// Fonction pour mettre à jour la position du carrousel
function updateCarousel() {
    const width = images[0].clientWidth + 10;

    // Met à jour la position du carrousel
    carousel.style.transition = 'transform 0.3s ease-in-out';
    carousel.style.transform = `translateX(${-index * width}px)`;
}

// Initial position setup
updateCarousel();

// Événement pour le bouton "Précédent"
prevBtn.addEventListener('click', () => {
    if (index <= 0) {
        index = images.length;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${-index * width}px)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 0.3s ease-in-out';
                index--;
                updateCarousel();
            });
        });
    } else {
        index--;
        updateCarousel();
    }
});

// Événement pour le bouton "Suivant"
nextBtn.addEventListener('click', () => {
    if (index >= images.length) {
        index = 1;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${0}px)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 0.3s ease-in-out';
                index++;
                updateCarousel();
            });
        });
    } else {
        index++;
        updateCarousel();
    }
});

// Événement pour basculer entre les modes clair et sombre
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    carouselContainer.classList.toggle('dark-mode');
});
