let counter = 0;
const heading = document.querySelector('h1');

setInterval(() => {
    counter++;
    heading.textContent = counter;
}, 1000);
