let id = 1;

function serializeForm(el) {
    const form = {};
    el.forEach(e => {
        form[e.name] = e.value;
    });;
    return form;
}

function cloneItem() {
    return $("tbody tr:first-child").clone(true);
}

function getTableEl(el, value) {
    return el.find(`[data-name='${value}']`);
}

function praCima(el) {
    $('.pracima').click(function() {
        const parentID = $(this).attr('data-parent');
        const el = $(parentID);
        if (el.prev() && el.prev().is(':visible')) {
            el.insertBefore(el.prev());
        }
    });
}

function praBaixo(el) {
    $('.prabaixo').click(function() {
        const parentID = $(this).attr('data-parent');
        const el = $(parentID);
        if (el.next()) {
            el.insertAfter(el.next());
        }
    });
}

function calIMC(form) {
    const formS = serializeForm(form);
    console.log(formS);
    return Math.floor(formS.peso / Math.pow(formS.altura, 2));
}

function appendTableItem(form, id) {
    var clone = cloneItem();
    var imc = calIMC(form);
    form.push({ name: 'imc', value: imc });
    form.forEach(function(el) {
        getTableEl(clone, el.name).text(el.value);
    });
    clone.find('i').attr('data-parent', '#' + id);
    clone.attr('id', id);
    $("tbody").append(clone);
}

function formSubmit() {
    $("#form").submit(function(e) {
        const form = $(this).serializeArray();
        const idTr = 'tr-' + id;
        form.push({ name: 'id', value: id });
        appendTableItem(form, idTr);
        $(this).find('input').val('');
        id++;
        return false;
    });
}

function deleteItem() {
    $('.delete').click(function() {
        const parentID = $(this).attr('data-parent');
        $(parentID).remove();
    });
}

function sortHelp(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

function sortBy(dataSort, desc) {
    const listSort = $("tbody tr:visible").sort(function(a, b) {
        aValue = getTableEl($(a), dataSort).text();
        bValue = getTableEl($(b), dataSort).text();
        if (desc) {
            return sortHelp(aValue, bValue);
        } else {
            return sortHelp(bValue, aValue);
        }
    });
    $('tbody').append(listSort);
}

function sortClick() {
    $('thead th').click(function() {
        $(this).toggleClass('desc');
        const desc = $(this).hasClass('desc');
        var dataSort = $(this).attr('data-sort');
        sortBy(dataSort, desc);
    });
}

function init() {
    formSubmit();
    deleteItem();
    sortClick();
    praCima();
    praBaixo();
}

(function() {
    init();
})();