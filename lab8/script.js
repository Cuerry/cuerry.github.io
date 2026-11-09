// A. Estado e variáveis com referência de elementos do DOM
const divProdutos = document.querySelector('#produtos');
const divCesto = document.querySelector('#produtos-cesto');
const spanTotal = document.querySelector('#preco-total');

if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// B. Funções utilitárias
function criarProduto(produto) {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;

    const h2 = document.createElement('h2');
    h2.textContent = produto.title;

    const categoria = document.createElement('p');
    categoria.textContent = produto.category;
    categoria.classList.add('categoria');

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.textContent = produto.price + ' €';
    preco.classList.add('preco');

    const rating = document.createElement('p');
    rating.textContent = '⭐ ' + produto.rating.rate + ' (' + produto.rating.count + ' avaliações)';

    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao cesto';
    botao.addEventListener('click', () => {
        const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        selecionados.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));
        atualizaCesto();
    });

    article.append(img, h2, categoria, descricao, preco, rating, botao);

    return article;
}

function criaProdutoCesto(produto) {
    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = produto.price + ' €';
    preco.classList.add('preco');

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.addEventListener('click', () => {
        const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        const indice = selecionados.findIndex(p => p.title === produto.title);
        selecionados.splice(indice, 1);
        localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));
        atualizaCesto();
    });

    article.append(h2, preco, botaoRemover);

    return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const article = criarProduto(produto);
        divProdutos.append(article);
    });
}

function atualizaCesto() {
    divCesto.innerHTML = '';
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    let total = 0;

    selecionados.forEach(produto => {
        const article = criaProdutoCesto(produto);
        divCesto.append(article);
        total = total + produto.price;
    });

    spanTotal.textContent = total.toFixed(2);
}

// D. Event Listeners

// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
