
// declaração de variáveis
const nodeInputNumero = document.querySelector('input');
const nodeInputSubmit = document.querySelector('input');
const nodeUlColecao = document.querySelector('ul');

const colecao = [];

// B. event handlers
function guardaCarta(numero){
    colecao.push(numero)
}

atualizaLista(colecao,nodeUlColecao)

function atualizaLista(colecao, nodeUlColecao){
    // Limpa a coleção
    nodeUlColecao = null;

    colecao.forEach(element => {
        console.log(element)
    });
}

// C. event listeners
form.onsubmit = (event) => {
            event.preventDefault();
            // ...
}

guardaCarta(nodeInputNumero);
