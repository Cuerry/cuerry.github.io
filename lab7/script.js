// A. Estado e variáveis com referência de elementos do DOM
const divProdutos = document.querySelector('#produtos');

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

    article.append(img, h2, categoria, descricao, preco, rating);

    return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const article = criarProduto(produto);
        divProdutos.append(article);
    });
}

// D. Event Listeners

// E. Inicialização
renderizarProdutos(produtos);
