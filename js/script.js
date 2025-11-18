// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) {
      window.scrollTo({
        top: alvo.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Envio de dados para WhatsApp com validação
document.getElementById("whatsappForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const whatsapp = document.getElementById("whatsapp");
  const assunto = document.getElementById("assunto");
  const botao = document.querySelector(".btn-enviar");

  let valido = true;

  // Função auxiliar para verificar campos
  [nome, email, whatsapp, assunto].forEach(campo => {
    if (!campo.value.trim()) {
      campo.classList.add("error");
      valido = false;
    } else {
      campo.classList.remove("error");
    }
  });

  if (!valido) {
    return; // impede envio se houver erro
  }

  // Mostra animação de carregamento
  botao.classList.add("loading");
  botao.textContent = "";

  // Substitua pelo número real do WhatsApp (somente números, ex: 5581999999999)
  const numeroEmpresa = "5591999635260";

  const mensagem = `*Formulário de Contato - Grupo Gomes & Rosiane*%0A
*Nome completo:* ${nome.value}%0A
*E-mail:* ${email.value}%0A
*WhatsApp:* ${whatsapp.value}%0A
*Assunto:* ${assunto.value}`;

  const link = `https://wa.me/${numeroEmpresa}?text=${mensagem}`;

  // Simula tempo de carregamento (melhor UX)
  setTimeout(() => {
    window.open(link, "_blank");
    botao.classList.remove("loading");
    botao.textContent = "Enviar pelo WhatsApp";
    this.reset(); // limpa o formulário
  }, 1000);
});

document.querySelectorAll('.card').forEach(card => {
  const infoBtn = card.querySelector('.btn-info');
  const cardBack = card.querySelector('.card-back');
  const closeBtn = card.querySelector('.btn-close');

  // Mostrar descrição detalhada
  infoBtn.addEventListener('click', () => {
    cardBack.style.display = 'flex';
  });

  // Fechar ao clicar no X
  closeBtn.addEventListener('click', () => {
    cardBack.style.display = 'none';
  });

  // Fechar ao tirar o mouse do card
  card.addEventListener('mouseleave', () => {
    cardBack.style.display = 'none';
  });
});

function abrirPDFs() {
    // Substitua pelos links corretos dos seus PDFs
    window.open('src/Cartao-Help-24h-ok.pdf', '_blank');
    window.open('src/HELP 5.0 CORP 2 A 30 VDS – Luck Card.pdf', '_blank');
  }