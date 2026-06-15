document.addEventListener('DOMContentLoaded', function() {
    const barraNavegacao = document.getElementById('menu-principal');
    const botaoMenu = document.getElementById('hamburger-btn');
    const menuGavetaCelular = document.getElementById('mobile-menu');
    const corpoPagina = document.body;
 
    if (barraNavegacao) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 40) {
                barraNavegacao.classList.add('scrolled');
            } else {
                barraNavegacao.classList.remove('scrolled');
            }
        });
    }
  
    function alternarMenuCelular() {
        if (botaoMenu && menuGavetaCelular) {
            botaoMenu.classList.toggle('active');
            menuGavetaCelular.classList.toggle('active');
            corpoPagina.classList.toggle('menu-open');       
            botaoMenu.textContent = menuGavetaCelular.classList.contains('active') ? '✕' : '☰';
        }
    }

    if (botaoMenu) {
        botaoMenu.addEventListener('click', alternarMenuCelular);
    }

    const linksDoMenuCelular = document.querySelectorAll('.links-mobile a');
    linksDoMenuCelular.forEach(link => {
        link.addEventListener('click', function() {
            if (menuGavetaCelular && menuGavetaCelular.classList.contains('active')) {
                alternarMenuCelular();
            }
        });
    });

    const botoesDeTrocaTema = document.querySelectorAll('#btn-theme-desktop, #btn-theme-mobile');
    botoesDeTrocaTema.forEach(botao => {
        botao.addEventListener('click', function() {
            corpoPagina.classList.toggle('light-mode');
        });
    });

    let tamanhoFontePorcentagem = 100;
    
    function aplicarNovoTamanhoFonte(valorModificador) {
        let novoTamanhoCalculado = tamanhoFontePorcentagem + valorModificador;
        
        if (novoTamanhoCalculado >= 85 && novoTamanhoCalculado <= 130) {
            tamanhoFontePorcentagem = novoTamanhoCalculado;
            document.documentElement.style.fontSize = tamanhoFontePorcentagem + "%";
        }
    }

    const botoesAumentarLetra = document.querySelectorAll('#btn-aumentar, #btn-aumentar-mobile');
    botoesAumentarLetra.forEach(botao => {
        botao.addEventListener('click', function() {
            aplicarNovoTamanhoFonte(5);
        });
    });
    
    const botoesDiminuirLetra = document.querySelectorAll('#btn-diminuir, #btn-diminuir-mobile');
    botoesDiminuirLetra.forEach(botao => {
        botao.addEventListener('click', function() {
            aplicarNovoTamanhoFonte(-5);
        });
    });

    const btnTelaCheia = document.getElementById('btn-tela-cheia');
    const containerJogo = document.getElementById('container-do-seu-jogo');

    if (btnTelaCheia && containerJogo) {
        btnTelaCheia.addEventListener('click', function() {
            if (containerJogo.requestFullscreen) {
                containerJogo.requestFullscreen();
            } else if (containerJogo.mozRequestFullScreen) {
                containerJogo.mozRequestFullScreen();
            } else if (containerJogo.webkitRequestFullscreen) {
                containerJogo.webkitRequestFullscreen();
            } else if (containerJogo.msRequestFullscreen) {
                containerJogo.msRequestFullscreen();
            }
        });
    }
});







