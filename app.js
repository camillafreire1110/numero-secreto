let listaDeNumerosSorteados = [];
let numeroLimite = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

const inputChute = document.querySelector('.container__input');
const avatar = document.getElementById('avatar');
const btnChutar = document.getElementById('btn-chutar');
const btnReiniciar = document.getElementById('reiniciar');

// Função para exibir texto no HTML
function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    avatar.src = "./img/ia.png";
}

// Função para falar usando Web Speech API
function falar(texto) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    }
}

// Mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 30');
    falar('Bem-vindo ao jogo do número secreto! Escolha um número entre 1 a 30.');
    tentativas = 0;
}

// Função principal ao chutar
function verificarChute() {
    let chute = parseInt(inputChute.value);

    if (!chute || chute < 1 || chute > 30) {
        exibirTextoNaTela('p', 'Digite um número válido entre 1 e 30');
        falar('Digite um número válido entre 1 e 30');
        return;
    }

    tentativas++;

    if (chute === numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagem = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1', mensagem);
        falar(mensagem);
        btnReiniciar.removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
            falar('O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
            falar('O número secreto é maior');
        }
        inputChute.value = '';
    }
}

// Gera número aleatório único
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    if (listaDeNumerosSorteados.length === numeroLimite) listaDeNumerosSorteados = [];

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    inputChute.value = '';
    exibirMensagemInicial();
    btnReiniciar.setAttribute('disabled', true);
    avatar.src = "./img/ia.png";
}

// Eventos dos botões
btnChutar.addEventListener('click', verificarChute);
btnReiniciar.addEventListener('click', reiniciarJogo);

// Inicializa mensagem
exibirMensagemInicial();
