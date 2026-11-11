// A. Estado e variáveis com referência de elementos do DOM
let todosProdutos = [];
const divProdutos = document.querySelector('#produtos');
const divCesto = document.querySelector('#produtos-cesto');
const spanTotal = document.querySelector('#preco-total');
const selectCategoria = document.querySelector('#select-categoria');
const selectOrdem = document.querySelector('#select-ordem');
const inputPesquisa = document.querySelector('#input-pesquisa');

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

function aplicarFiltros() {
    let produtosFiltrados = [...todosProdutos];

    // Filtrar por categoria
    if (selectCategoria.value !== '') {
        produtosFiltrados = produtosFiltrados.filter(produto =>
            produto.category === selectCategoria.value
        );
    }

    // Ordenar por preço
    if (selectOrdem.value === 'asc') {
        produtosFiltrados.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (selectOrdem.value === 'desc') {
        produtosFiltrados.sort((a, b) => Number(b.price) - Number(a.price));
    }

    // Pesquisar produtos
    if (inputPesquisa.value !== '') {
        const pesquisa = inputPesquisa.value.toLowerCase();

        produtosFiltrados = produtosFiltrados.filter(produto =>
            produto.title.toLowerCase().includes(pesquisa)
        );
    }

    renderizarProdutos(produtosFiltrados);
}

// C. Event handlers
function renderizarProdutos(produtos) {
    divProdutos.innerHTML = '';

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
        total = total + Number(produto.price);
    });

    spanTotal.textContent = total.toFixed(2);
}

function carregarCategorias() {
    fetch('https://deisishop.pw.deisi.ulusofona.pt/categories')
        .then(resposta => resposta.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.name;
                option.textContent = categoria.name;
                selectCategoria.append(option);
            });
        })
        .catch(erro => console.log(erro));
}

function carregarProdutos() {
    const categoria = selectCategoria.value;
    const ordem = selectOrdem.value;
    const pesquisa = inputPesquisa.value;

    let url = 'https://deisishop.pw.deisi.ulusofona.pt/products';

    const parametros = new URLSearchParams();

    if (categoria !== '') {
        parametros.append('category', categoria);
    }

    if (ordem !== '') {
        parametros.append('sort', ordem);
    }

    if (pesquisa !== '') {
        parametros.append('search', pesquisa);
    }

    if (parametros.toString() !== '') {
        url = url + '?' + parametros.toString();
    }

    fetch(url)
        .then(resposta => resposta.json())
        .then(produtos => renderizarProdutos(produtos))
        .catch(erro => console.log(erro));
}

// D. Event Listeners

selectCategoria.addEventListener('change', aplicarFiltros);
selectOrdem.addEventListener('change', aplicarFiltros);
inputPesquisa.addEventListener('input', aplicarFiltros);

// E. Inicialização
fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
    .then(resposta => resposta.json())
    .then(produtos => {
        todosProdutos = produtos;
        aplicarFiltros();
    })
    .catch(erro => console.log(erro));

atualizaCesto();
carregarCategorias();
