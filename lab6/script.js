document.addEventListener('DOMContentLoaded', () => {

    // A. variáveis
    const nodeInputNumero = document.querySelector('input[type="number"]');
    const nodeUlColecao = document.querySelector('#colecao ul');
    const nodeContador = document.querySelector('#colecao h3 span');
    const nodeUlRepetidos = document.querySelector('#repetidos ul');
    const nodeContadorRepetidos = document.querySelector('#repetidos h3 span');
    const form = document.querySelector('form');

    const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
    const repetidos = JSON.parse(localStorage.getItem('repetidos')) || [];

    atualizaLista(colecao, nodeUlColecao, nodeContador);
    atualizaLista(repetidos, nodeUlRepetidos, nodeContadorRepetidos);

    // B. event handlers
    function guardaCarta() {
        const numero = nodeInputNumero.value;

        if (colecao.includes(numero)) {
            repetidos.push(numero);
            repetidos.sort();
            localStorage.setItem('repetidos', JSON.stringify(repetidos));
            atualizaLista(repetidos, nodeUlRepetidos, nodeContadorRepetidos);
        } else {
            colecao.push(numero);
            colecao.sort();
            localStorage.setItem('colecao', JSON.stringify(colecao));
            atualizaLista(colecao, nodeUlColecao, nodeContador);
        }

        nodeInputNumero.value = '';
    }

    function atualizaLista(lista, nodeUl, nodeSpan) {
        nodeUl.innerHTML = '';
        lista.forEach(element => {
            const li = document.createElement('li');

            if (nodeUl === nodeUlRepetidos) {
                li.innerHTML = element + ' <button class="btn-eliminar">Eliminar</button>';
            } else {
                li.textContent = element;
            }

            nodeUl.appendChild(li);
        });

        nodeSpan.textContent = lista.length;

        nodeUlRepetidos.querySelectorAll('.btn-eliminar').forEach((botao, indice) => {
            botao.addEventListener('click', () => {
                repetidos.splice(indice, 1);
                localStorage.setItem('repetidos', JSON.stringify(repetidos));
                atualizaLista(repetidos, nodeUlRepetidos, nodeContadorRepetidos);
            });
        });
    }

    // C. event listeners
    form.onsubmit = (event) => {
        event.preventDefault();
        guardaCarta();
    };

});
