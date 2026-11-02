const visor = document.getElementById("resultado");
const botoes = document.querySelectorAll(".botoes");

let valorAtual = "0";
let primeiroValor = null;
let operador = null;
let novoNumero = false;

function atualizarVisor() {
    visor.textContent = valorAtual;
}

function calcular() {
    const segundoValor = Number(valorAtual);

    if (operador === "+") {
        valorAtual = String(primeiroValor + segundoValor);
    } else if (operador === "-") {
        valorAtual = String(primeiroValor - segundoValor);
    } else if (operador === "*") {
        valorAtual = String(primeiroValor * segundoValor);
    } else if (operador === "/") {
        valorAtual = segundoValor === 0
            ? "Erro"
            : String(primeiroValor / segundoValor);
    }

    primeiroValor = null;
    operador = null;
    novoNumero = true;
    atualizarVisor();
}

function tratarEntrada(valor) {
    if (valor >= "0" && valor <= "9") {
        if (novoNumero || valorAtual === "0" || valorAtual === "Erro") {
            valorAtual = valor;
            novoNumero = false;
        } else {
            valorAtual += valor;
        }
    } else if (valor === ".") {
        if (novoNumero || valorAtual === "Erro") {
            valorAtual = "0.";
            novoNumero = false;
        } else if (!valorAtual.includes(".")) {
            valorAtual += ".";
        }
    } else if (valor === "C" || valor === "Escape") {
        valorAtual = "0";
        primeiroValor = null;
        operador = null;
        novoNumero = false;
    } else if (valor === "<" || valor === "Backspace") {
        if (!novoNumero && valorAtual !== "Erro") {
            valorAtual = valorAtual.length > 1
                ? valorAtual.slice(0, -1)
                : "0";
        }
    } else if (valor === "=" || valor === "Enter") {
        if (operador !== null && !novoNumero) {
            calcular();
            return;
        }
    } else if (valor === "+" || valor === "-" || valor === "*" || valor === "/") {
        if (valorAtual === "Erro") {
            valorAtual = "0";
        }

        if (operador !== null && !novoNumero) {
            calcular();
        }

        primeiroValor = Number(valorAtual);
        operador = valor;
        novoNumero = true;
    }

    atualizarVisor();
}

botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
        tratarEntrada(botao.textContent.trim());
    });
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" || evento.key === "Backspace") {
        evento.preventDefault();
    }

    tratarEntrada(evento.key);
});

atualizarVisor();
