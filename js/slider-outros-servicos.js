
document.addEventListener("DOMContentLoaded", function () {

  const sliderImages = [
    ["/images/banner - help.png", "images/Banner - plano de saude.jpeg"]
  ];

  let currentIndex = 0; 
  let currentCard = 0; 

  const overlay = document.getElementById("slider-overlay");
  const sliderImg = document.getElementById("slider-image");

  const btnMoreInfo = document.querySelectorAll(".btn-info");
  const btnMoreInfoOutros = document.querySelector(".btn-info-outros");

  const arrowLeft = document.querySelector(".slider-arrow.left");
  const arrowRight = document.querySelector(".slider-arrow.right");
  const btnClose = document.querySelector(".slider-close");

  /* --------------------------------------------
     ABRIR SLIDER NA SECTION "OUTROS SERVIÇOS"
     -------------------------------------------- */
  btnMoreInfoOutros.addEventListener("click", () => {
    currentCard = sliderImages.length - 1; // último conjunto (OUTROS SERVIÇOS)
    currentIndex = 0;

    sliderImg.src = sliderImages[currentCard][currentIndex];

    overlay.style.display = "flex";
  });

  /* SETA DIREITA */
  arrowRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % sliderImages[currentCard].length;
    sliderImg.src = sliderImages[currentCard][currentIndex];
  });

  /* SETA ESQUERDA */
  arrowLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + sliderImages[currentCard].length) % sliderImages[currentCard].length;
    sliderImg.src = sliderImages[currentCard][currentIndex];
  });

  /* FECHAR */
  btnClose.addEventListener("click", () => {
    overlay.style.display = "none";
  });

});