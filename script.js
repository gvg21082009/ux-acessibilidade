// --- CONTROLE DE TAMANHO DE FONTES ---
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

const btnAumentaFonte = document.getElementById("btnAumentaTexto");
const btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

if (btnAumentaFonte && btnDiminuiFonte) {
    btnAumentaFonte.addEventListener("click", aumentaFonte);
    btnDiminuiFonte.addEventListener("click", diminuiFonte);
}

function aumentaFonte() {
    tamanhoFonteAtual += valorAdicionado;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

function diminuiFonte() {
    tamanhoFonteAtual = Math.max(12, tamanhoFonteAtual - valorSubtraido); // Evita que a fonte fique menor que 12px
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}


// --- CONTROLE DO MODAL DE AJUDA ---
let btnAjuda = document.querySelector(".botao-ajuda");
let btnFechar = document.querySelector(".botao-fechar");
let modal = document.querySelector(".modal-fundo");

if (btnAjuda && modal) {
    btnAjuda.addEventListener("click", abreModal);
}

if (btnFechar && modal) {
    btnFechar.addEventListener("click", fechaModal);
}

function abreModal() {
    modal.style.display = "block";
}

function fechaModal() {
    modal.style.display = "none";
}


// --- LEITURA DE TELA EM VOZ ALTA ---
let lendo = false;
const btnLeitura = document.getElementById("btnVoz");

if (btnLeitura) {
    btnLeitura.addEventListener("click", lerEmVozAlta);
}

function lerEmVozAlta() {
    // Se já estiver falando, alterna entre pausar e continuar
    if (lendo === true) {
        if (speechSynthesis.paused === true) {
            speechSynthesis.resume();
            btnLeitura.innerText = "⏸️ Pausar Voz";
        } else {
            speechSynthesis.pause();
            btnLeitura.innerText = "▶️ Continuar";
        }
        return;
    }

    let conteudo = document.querySelector("main");
    if (!conteudo) return;
    
    let texto = conteudo.innerText;
    let fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    
    fala.onend = function() {
        finalizarLeitura();
    };

    speechSynthesis.cancel(); // Cancela qualquer leitura anterior
    speechSynthesis.speak(fala);

    lendo = true;
    btnLeitura.innerText = "⏸️ Pausar Voz";
}

function pararLeitura() {
    speechSynthesis.cancel();
    finalizarLeitura();
}

function finalizarLeitura() {
    lendo = false;
    if (btnLeitura) {
        btnLeitura.innerText = "🔊 Ouvir Página";
    }
}