document.addEventListener('DOMContentLoaded', function() {
    // Seleção dos elementos principais do menu celular
    const barraNavegacao = document.getElementById('menu-principal');
    const botaoMenu = document.getElementById('hamburger-btn');
    const menuGavetaCelular = document.getElementById('mobile-menu');
    const corpoPagina = document.body;

  
    //ANIMAÇÃO DA BARRA DE NAVEGAÇÃO AO ROLAR
   
    if (barraNavegacao) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 40) {
                barraNavegacao.classList.add('scrolled');
            } else {
                barraNavegacao.classList.remove('scrolled');
            }
        });
    }

    
    // FUNÇÕES PARA O MENU MOBILE (CELULAR)
   
    function alternarMenuCelular() {
        if (botaoMenu && menuGavetaCelular) {
            botaoMenu.classList.toggle('active');
            menuGavetaCelular.classList.toggle('active');
            corpoPagina.classList.toggle('menu-open');
            
            // Troca o ícone visual baseado no estado ativo
            botaoMenu.textContent = menuGavetaCelular.classList.contains('active') ? '✕' : '☰';
        }
    }

    if (botaoMenu) {
        botaoMenu.addEventListener('click', alternarMenuCelular);
    }

    // Fecha o menu lateral automaticamente ao clicar em qualquer link interno
    const linksDoMenuCelular = document.querySelectorAll('.links-mobile a');
    linksDoMenuCelular.forEach(link => {
        link.addEventListener('click', function() {
            if (menuGavetaCelular && menuGavetaCelular.classList.contains('active')) {
                alternarMenuCelular();
            }
        });
    });

    // ==========================================
    // 3. INTERRUPTOR DE TEMA (CLARO E ESCURO)
    // ==========================================
    const botoesDeTrocaTema = document.querySelectorAll('#btn-theme-desktop, #btn-theme-mobile');
    botoesDeTrocaTema.forEach(botao => {
        botao.addEventListener('click', function() {
            corpoPagina.classList.toggle('light-mode');
        });
    });

    // ==========================================
    // 4. SISTEMA DE ACESSIBILIDADE DE FONTE
    // ==========================================
    let tamanhoFontePorcentagem = 100; // Define o tamanho padrão inicial como 100%
    
    function aplicarNovoTamanhoFonte(valorModificador) {
        let novoTamanhoCalculado = tamanhoFontePorcentagem + valorModificador;
        
        // Limites seguros de zoom (85% a 130%) para o texto não quebrar o layout
        if (novoTamanhoCalculado >= 85 && novoTamanhoCalculado <= 130) {
            tamanhoFontePorcentagem = novoTamanhoCalculado;
            document.documentElement.style.fontSize = tamanhoFontePorcentagem + "%";
        }
    }

    // Configuração dos botões de Aumentar Texto (A+)
    const botoesAumentarLetra = document.querySelectorAll('#btn-aumentar, #btn-aumentar-mobile');
    botoesAumentarLetra.forEach(botao => {
        botao.addEventListener('click', function() {
            aplicarNovoTamanhoFonte(5); // Aumenta de 5 em 5%
        });
    });
    
    // Configuração dos botões de Diminuir Texto (A-)
    const botoesDiminuirLetra = document.querySelectorAll('#btn-diminuir, #btn-diminuir-mobile');
    botoesDiminuirLetra.forEach(botao => {
        botao.addEventListener('click', function() {
            aplicarNovoTamanhoFonte(-5); // Diminui de 5 em 5%
        });
    });

    // ==========================================
    // 5. SISTEMA DE TELA CHEIA (FULLSCREEN) DO JOGO
    // ==========================================
    const btnTelaCheia = document.getElementById('btn-tela-cheia');
    const containerJogo = document.getElementById('container-do-seu-jogo');

    if (btnTelaCheia && containerJogo) {
        btnTelaCheia.addEventListener('click', function() {
            // Suporte multiplataforma para navegadores antigos e atuais
            if (containerJogo.requestFullscreen) {
                containerJogo.requestFullscreen();
            } else if (containerJogo.mozRequestFullScreen) { /* Firefox */
                containerJogo.mozRequestFullScreen();
            } else if (containerJogo.webkitRequestFullscreen) { /* Chrome, Safari e Opera */
                containerJogo.webkitRequestFullscreen();
            } else if (containerJogo.msRequestFullscreen) { /* IE/Edge */
                containerJogo.msRequestFullscreen();
            }
        });
    }
});







