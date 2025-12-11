// Array com imagens de cada card
const cardImages = [
  ["images-slider/slider-consultasmedicas1.png", "images-slider/slider-consultasmedicas2.png",
    "images-slider/slider-consultasmedicas3.png", "images-slider/slider-consultasmedicas4.png"], // Card 0 (Consultas médicas)

  ["images-slider/slider-planofunerario1.png", "images-slider/slider-planofunerario2.png",
    "images-slider/slider-planofunerario3.png", "images-slider/slider-planofunerario4.png"], // Card 1 (Funerária)

  ["images-slider/slider-seguros1.png", "images-slider/slider-seguros2.png",
    "images-slider/slider-seguros3.png", "images-slider/slider-seguros4.png"], // Card 2 (Seguros)

  ["images-slider/slider-certificados.png"], // Card 3 (Certificados)

  ["images-slider/slider-servicosdemobildade.png"], // Card 4 (Serviços de mobilidade)

  ["images-slider/slider-imoveis.png"], // Card 5 (Imóveis)

  ["images-slider/slider-planodesaude.png", "images-slider/slider-planoodonto.png"], // Card 6 (Planos de saude e odonto)

  ["images-slider/slider-otica.png"], // Card 7 (Ótica)

  ["images-slider/slider-contabilidade.png"], // Card 8 (Contabilidade)

  ["images-slider/slider-documentos.png"] // Card 9 (Documentação)
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

    // DESATIVAR ROLAGEM DA PÁGINA
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

  });
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  sliderImagesContainer.innerHTML = '';

  // REATIVAR ROLAGEM
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';

});

// Mostrar imagens do card
function showImages(cardIndex) {

  // --- Suporte a Swipe no Mobile (Função de scroll - para passar as imagens tocando na tela) ---
  let touchStartX = 0;
  let touchEndX = 0;

  function handleGesture() {
    const images = cardImages[currentCardIndex];

    // Distância mínima do swipe para considerar gesto
    const swipeThreshold = 50;

    if (touchEndX + swipeThreshold < touchStartX) {
      // Swipe Esquerda → Próxima imagem
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImages(currentCardIndex);
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe Direita → Imagem anterior
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImages(currentCardIndex);
    }
  }

  // Eventos de toque no container das imagens
  sliderImagesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderImagesContainer.addEventListener('touchmove', (e) => {
    touchEndX = e.changedTouches[0].screenX;
  });

  sliderImagesContainer.addEventListener('touchend', () => {
    handleGesture();
  });

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