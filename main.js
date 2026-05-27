// Seleciona os elementos
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

// Alterna a classe 'active' ao clicar no menu hambúrguer
hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fecha o menu quando um dos links é clicado (para melhorar a navegação mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
