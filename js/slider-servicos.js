// Array com imagens de cada card
const cardImages = [
  ["images-slider/slider-consultas-medicas.png"], // Card 0
  ["images-slider/slider-planosfunerarios.png"], // Card 1
  ["images-slider/slider-seguro-automotivo.png", "images-slider/slider-seguro-de-vida.png", 
    "images-slider/slider-seguro-residencial.png"], // Card 2
  ["images-slider/slider-certificados.png"], // Card 3
  ["images-slider/slider-servicosdemobildade.png"], // Card 4
  ["images-slider/slider-imoveis.png"], // Card 5
  ["images-slider/slider-planodesaude.png", "images-slider/slider-planoodonto.png"], // Card 6
  ["images-slider/slider-otica.png"], // Card 7
  ["images-slider/slider-contabilidade.png"], // Card 8
  ["images-slider/slider-documentos.png"] // Card 9
];

const modal = document.getElementById('sliderModal');
const sliderImagesContainer = modal.querySelector('.slider-images');
const leftArrow = modal.querySelector('.left-arrow');
const rightArrow = modal.querySelector('.right-arrow');
const closeBtn = modal.querySelector('.close-btn');

let currentCardIndex = 0;
let currentImageIndex = 0;

// Abrir modal
document.querySelectorAll('.btn-info').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCardIndex = parseInt(btn.dataset.card);
    currentImageIndex = 0;
    showImages(currentCardIndex);
    modal.style.display = 'flex';
  });
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  sliderImagesContainer.innerHTML = '';
});

// Mostrar imagens do card
function showImages(cardIndex) {
  sliderImagesContainer.innerHTML = '';
  const images = cardImages[cardIndex];

  // Inserir a imagem atual
  const img = document.createElement('img');
  img.src = images[currentImageIndex];
  sliderImagesContainer.appendChild(img);

  // Mostrar ou esconder setas
  if (images.length <= 1) {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
  } else {
    leftArrow.style.display = 'block';
    rightArrow.style.display = 'block';
  }
}

// Navegação das setas
leftArrow.addEventListener('click', () => {
  const images = cardImages[currentCardIndex];
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImages(currentCardIndex);
});

rightArrow.addEventListener('click', () => {
  const images = cardImages[currentCardIndex];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImages(currentCardIndex);
});