function lastChild() {
    $('#last-child .saladas:not(:last-child)').addBorda('black');
}

function cards() {
    const card = document.querySelectorAll('.cards .col-sm-6:nth-child(5) .card');
    addBorda(card);
}

function init() {
    lastChild();
    cards();
}

(() => {
    init();
})();